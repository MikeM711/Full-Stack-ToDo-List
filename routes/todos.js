const express = require('express')
const router = express.Router();
const db = require('../config/database')
const ToDo = require('../models/ToDoModel')

// Add a todo with a proper POST request
router.post('/add', (req,res) => {
    /* Execution is here because of client: axios.post('/todos/add', sentContent) */

    // body-parser let's us use 'req.body' , which extracts 'sentContent' from client, the 'todo'
    let todo = req.body

    // Create an instance of that 'todo' using a sequelize Model, and add it to the database
    ToDo.create(todo)
        .then((result) => {
            /* Once successfully added to the database: send database data to the client, so that we can extract the DB data in the client. Therefore, in the client, we know what happened in the database.

            What happened in the database? Postgres gave an 'id' and a 'creation'/'update' time.  All of which we can use in the client. 
            
            Most importantly - we can have the postgres DB id match Redux Store id, for easy 'todo' deletion*/
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

module.exports = router