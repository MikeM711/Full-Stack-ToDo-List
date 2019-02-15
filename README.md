# Full-Stack-ToDo-List
 A Full Stack To-Do List Application

## Update Discussion

> Discuss Commits Here

## Currently

### Front-End

- A "To-Do List" that can add and delete todos
  - Problem: todos are not saved, need a database to save todos
- Redux fully set up
- "todos" stored in Redux Store - `/reducers/rootReducer.js`

### Back-End
- REST API has "todos" in the URL `/todos`
- Attached a PostgreSQL database with Sequelize ORM
  - database is named "todoDB" - Because of `new Sequelize('todoDB', ...` in the file `config/database.js`
  - "todoDB" has a table named "todos" - Because of `db.define('todo', ...` in the file `models/ToDoModel.js`

## Future

### Problems
- Front-End CANNOT fetch REST API
  - Plan to use axios
  - Have an "actions" folder?

### Updates
- Add a "To Do" Edit Feature
