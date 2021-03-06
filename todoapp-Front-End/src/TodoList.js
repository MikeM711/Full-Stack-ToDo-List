import React, { Component } from 'react';
import Todos from './Todos'
import AddTodo from './AddTodo'
import Navbar from './Navbar'
import {connect} from 'react-redux'
import axios from 'axios'

class TodoList extends Component {

  componentDidMount() {
    
    // When component mounts, display all todos from Database + cycle through them if successful

    /* Future: have this axios GET request sent to Redux only once
    So that we don't have to keep refreshing the page to get the data */
    axios.get('/todos')
      .then(res => {
        for(let i = 0; i < res.data.allToDos.length; i++){
          this.props.addToDoDB(res.data.allToDos[i]);
        }
      })
      .catch(err => console.log(err))
  }

  deleteTodo = (id) => {

    // To delete a todo, we just need the 'id' of the todo, no 'content'

    /* Execution enters here because the "Todos" component, responsible for the full list, triggers this function in its passed-down props (via onClick of the span tag, that holds the singular "To Do" content) */

    /* First, delete the todo off the database, and when successful,  delete the todo off Redux Store (exactly as if there were no database involved) */

    /* axios.delete does not have a data parameter, you must use a URL to send data to the backend. Use backticks `` and ${} for dynamic strings (in our case, URLs).
    
    The URL of the frontend MUST EQUAL the URL of the backend, so that both can talk to each other*/
    axios.delete(`/todos/delete/${id}`)
      .then(res => {
        /* execution enters here when HTTP response has ended*/
        // axios was successful, item has now been added to the database
        // 'res' parameter is not mandatory
        console.log('DB successfully deleted todo ' + JSON.stringify(res))
        /* Just like before without the database - with the help of the parameter 'id' from deleteTodo, initiate the function that dispatches a DELETE action to the Redux Store with the 'id' payload */
        this.props.deleteToDoRedux(id)
      })
      .catch((err) => console.log('hit'))
      
  }
  
  addTodo = (todo) => {

    // To add a todo, we just need the 'content' of the todo, no 'id'

    /* Execution enters here because "AddToDo" component triggers this function in its passed-down props (via onSubmit) */

    // First, POST the todo into the database
    axios.post('/todos/add', {
      todo: todo.content
    })
    .then(res => {
      // Second, add todo to Redux Store

      // res.data = data: {BACKEND STUFF}

      // take the todo POST response database data, extract it, and use the id/content and store in the Redux Store
      todo.id = res.data.data.id
      todo.content = res.data.data.todo
      this.props.addToDoRedux(todo)
    })
  }

  updateTodo = (fullTodo) => {
    // To update the todo to Redux/Database, we will need 'id' AND 'content'
      // eg: { content: 'sleep a lot', id: 2 }
    
    // Axios PUT request
    axios.put('/todos/put', {
      todo: fullTodo
    })
    .then(res => {
      // res.data = data: {BACKEND STUFF}

      /* We no longer want to use front-end data:
        this.props.updateToDoRedux(fullTodo) */
      /* We WILL use backend data:
          this.props.updateToDoRedux(res.data)
        Why is this helpful? 
        Even though we could still get 'id' and 'content' from the Front-End...
        The BACKEND will bring us its 'id' and 'content' (added security) PLUS, the ENTIRE database row! (ie: createdAt, updatedAt, and more if you want)
      */

      // The payload, in the form of the Redux State's todos
      const backendData = {
        content: res.data.data.todo,
        id: res.data.data.id,
      }

      this.props.updateToDoRedux(backendData)
    })
  }

	render() {
		console.log(this.props.todosRedux) // logs the Redux Store
		return (
			<div className="todo-List">
				<Navbar />
				<div className="todo-app container">
					<h1 className="todo-list-title center blue-text">Todo List</h1>
					<Todos
						todos={this.props.todosRedux}
						deleteTodo={this.deleteTodo}
						updateTodo={this.updateTodo}
					/>
					<AddTodo addTodo={this.addTodo} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    todosRedux: state.todos
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    // todo includes the todo AND the id
    addToDoRedux: (todo) => {dispatch({type:'ADD_TODO', todo: todo})},
    deleteToDoRedux: (id) => {dispatch({type:'DELETE_TODO', id: id })},
    addToDoDB: (todo) => {dispatch({type: 'ADD_TODO_FROM_DB', todo: todo})},
    updateToDoRedux: (fullTodo) => {dispatch({type: 'UPDATE_TODO', fullTodo: fullTodo})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
