const express = require('express')
const router = express.Router();
const db = require('../config/database')
const ToDo = require('../models/ToDoModel')

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