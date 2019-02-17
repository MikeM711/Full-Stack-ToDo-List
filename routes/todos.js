const express = require('express')
const router = express.Router();
const db = require('../config/database')
const ToDo = require('../models/ToDoModel')

// Add a todo with a proper POST request
router.post('/add', (req,res) => {

    // req.body is { todo: 'Hello Database!' } - we are receiving this info from React frontend
    let todo = req.body

    ToDo.create(todo)
        .then((result) => {
            res.status(200).json({ data: result.dataValues });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });

})

router.get('/', (req,res) => {

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