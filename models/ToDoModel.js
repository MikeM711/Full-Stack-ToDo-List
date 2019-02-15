const Sequelize = require('sequelize')
const db = require('../config/database')

// Database Table is called todos - singular is todo
const ToDo = db.define('todo', {
   todo: {
       type: Sequelize.STRING
   },
})

module.exports = ToDo