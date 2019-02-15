const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database')

// Can we see the database?
db.authenticate()
   .then(() => console.log('Database connected...'))
   .catch(err => console.log('Error: ' + err))

const app = express();

app.get('/', (req,res) => res.send('INDEX'))

//todos routes
app.use('/todos', require('./routes/todos'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));