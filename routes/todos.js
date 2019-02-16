const express = require('express')
const router = express.Router();
const db = require('../config/database')
const ToDo = require('../models/ToDoModel')

// We are using GET not a POST
// When we GET request page /todos/add, we will create a hard-coded post
router.get('/add', (req,res) => {

    // hard coded
    let todo = 'Try More PostgreSQL'

    ToDo.create({
        todo
     })
        .then(gig => res.redirect('/todos'))
        .catch(err => console.log(err))

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