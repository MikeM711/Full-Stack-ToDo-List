const express = require('express')
const router = express.Router();
const db = require('../config/database')
const ToDo = require('../models/ToDoModel')

router.get('/', (req,res) => {

    //console.log(ToDoModel)

    ToDo.findAll()
        .then(myResult => {
            console.log('SUCCESS!')
        
            let toDoList = [];

            for(let i = 0; i < myResult.length; i++){
                toDoList.push(myResult[i].todo)
            }

            res.send(JSON.stringify(toDoList));
        })
        .catch(err => {
            console.log('THIS IS AN ERROR')
            console.log(err)
        })

        //res.send('heyooooo')
})

module.exports = router