const express = require('express')
const router = express.Router();
const db = require('../config/database')
const ToDo = require('../models/ToDoModel')

// express.Router() = A "mini app"

// Edit a todo with a PUT request
router.put('/put', (req, res) => {

    /* Just like POST, use req.body to get the 2nd parameter (the data object) of axios
        It holds the 'id' and 'content' - The {todo: fullTodo} 2nd parameter of axios in the Frontend
    */
    const { id, content, } = req.body.todo

    // The way the database is structured, the 'todo' property has the todo information, make sure to keep it that way
    const updateTodo = {
        todo: content
    };

    // Example: updateTodo = {todo: "Hard-Coded - Database is updated"},

    // update() method: Update the database using the Model in the location of the 'id' that was passed in from the frontend
    // Syntax: Model.update(dataObj,optionsObj)
    ToDo.update(
        updateTodo,
        {
            where: { id },
        })
        // If all goes to plan, the database has now been updated

        // GOAL: Send the newly updated data back to the Front-End

        // Option #1 - Quicker, but can only be used with POSTGRES:
            /* For postgres, we can use{ returning: true, where: { id } }
            As the 2nd param of update()
            */

        /* Option #2 - Longer, but more universal method:
            Again, remember, the database has already been updated
            We will be using .update()'s completed promise to do a 'safety check' 
            And we will use .findOne()'s completed promise to send data to the frontend
        */

        // The .update() method returns a promise with an integer parameter - how many rows are updated
        .then(([result]) => {
            /* if one row is updated, that means we are on the right track
                Basically, further security for our application - more constraints
            */
            if (result === 1) {
                // Again, it is not mandatory to know that result = 1
                // findOne() method: Search for a certain attribute (the 'id' of the object that came from the Front-End) and return a promise with the data of that item as a parameter
                return ToDo.findOne({
                    where: { id },
                });
            }
        })
        /* this .findOne() promise returns data
            More specifically: returns the data of the 'id' variable that the backend received from the frontend
        */
        .then((data) => {
            // Send the data to the frontend and end the HTTP request
            /* Note, we are sending the data encapsulated in a property (not mandatory)
                We could probably just say:
                    res.status(200).json({ data.dataValues });
            */
            res.status(200).json({ data: data.dataValues });
        })

        /*
        Option #2: the 2nd returning param - ONLY FOR POSTGRES

        Todo.update() 2nd param: { returning: true, where: { id } }

        .then(([rowsUpdate, [updatedTodo]]) => {

            // We now have access to a 2nd parameter from the returned Promise! - updatedTodo 
            // Create an if statement to check number of rows udpated as a 'safety check'

            res.json(updatedTodo)
        }) 
        */
        
        .catch((error) => {
            console.log('ERROR')
            res.status(400).json({ error });
        });
})


// Add a todo with a proper POST request
router.post('/add', (req,res) => {
    /* Execution is here because of client: axios.post('/todos/add', sentContent) */
    // body-parser let's us use 'req.body' , which extracts 'sentContent' from client, the 'todo'
    let todo = req.body

    // Create an instance of that 'todo' using a sequelize Model, and add it to the database
    ToDo.create(todo)
        .then((result) => {

            /* successful .create() promise returns the example object 'result':
            {"id":73,"todo":"test","updatedAt":"2019-02-20","createdAt":"2019-02-20"}
            */

            /* Once successfully added to the database: send this database data 'result' to the client (similar to res.write() ), so that we can extract the DB data in the client. Therefore, in the client, we know what happened in the database.

            What happened in the database? Postgres gave an 'id' and a 'creation'/'update' time.  All of which we can use in the client. 
            
            Most importantly - we can have the postgres DB id match Redux Store id, for easy 'todo' deletion
            
            What does res.json() ALSO do? It ends the response like res.end() - we must end the response for every response we do */

            res.status(200).json({ data: result.dataValues });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });

})

router.get('/', (req,res) => {
    /* Execution is here because of: axios.get('/todos') */

    //console.log(ToDoModel)
    
    ToDo.findAll()
        .then(allToDos => {
            console.log('SUCCESS!')

            /* 
            Get all To-Do's from the database (allToDos), and send it as a parameter in an HTTP Response, more specifically, send it inside a JSON response.

            res.json() also ends the response like res.end(), we must end the response on each response
            */
            res.json({
                allToDos,
            });

        })
        .catch(err => {
            console.log('THIS IS AN ERROR')
            console.log(err)
        })
})

// Delete todo with a DELETE request
router.delete('/delete/:id', (req, res) => {
  /* 
  Execution is here because of axios.delete(`/todos/delete/${id}`) 
  Note: the backticks and dynamic variable, `${id}` ,which signify a dynamic string or URL in our case
  */

  /* 
  PATH of router.delete()

  We will be extracing the id, that we want to delete, from the URL.
  Therefore, the URL must be dynamic. We need something to display this "dynamic" URL.
  Define a route parameter with a colon, :, and give the route param a name.
  - We will use the route parameter ':id'

  The URL with an added route parameter: '/delete/:id'
  AKA: 'todos/delete/:id'

  The URL of the backend MUST EQUAL the URL of the frontend, so that both can talk to each other
  */

  // console log req/res is impossible everywhere, even with JSON stringify

  // We cannot use req.body, because we cannot send data using axios.delete, only a URL

  /* 
  req.params is a property containing properties mapped to the named route “parameters”. It is used when you want to extract a "param" from the url.
  In this case: req.params only has one object: the 'id'
  */
  
  // we can do res.end() in here if we want... But probably best to do it at the end of all of this..

  // Destructure id off of req.params
  const { id } = req.params;

  /* 
  Using the Model, delete an item instance using destroy() method.
  How will we destroy? "Filter the destroy" - using 'options.where' 
  
  What will we filter? The 'id' in the database that is equal to the 'id' integer value we have.

  Therefore - id:id
  Using ES6 - id
  */
  ToDo.destroy({
    where: {
      id,
    },
  })
    .then((result) => {
      // The return of this promise is an integer - the number of deleted rows
      /* If the number of deleted rows is only one, enter the 'if' statement, which ends the response.
      This keeps our application in check, in case we delete nothing, or if we delete 2+ rows at once */
      if (result === 1) {
        /* For the HTTP response to be successful, we should must tell the server that the message is complete.
        Like all other responses, end the reponse using res.end(), res.json(), or res.send() - where latter 2 include res.end() */

        // res.write('necessaryString') + res.end() = res.send('necessaryString')

        // We can just use res.status(#00).json() for everything
        res.status(200).json({ success: true });
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

module.exports = router