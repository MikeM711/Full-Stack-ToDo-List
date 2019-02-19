import React, { Component } from 'react';
import Todos from './Todos'
import AddTodo from './AddTodo'
import {connect} from 'react-redux'
import axios from 'axios'

class App extends Component {

  componentDidMount() {

    // When component mounts, display all todos from Database + cycle through them if successful
    axios.get('/todos')
      .then(res => {
        for(let i = 0; i < res.data.allToDos.length; i++){
          this.props.addToDoDB(res.data.allToDos[i]);
        }
      })
      .catch(err => console.log(err))
  }

  deleteTodo = (id) => {
    this.props.deleteToDoRedux(id)
    
  }
  
  addTodo = (todo) => {
    /* Execution enters here because "AddToDo" component triggers this function in its passed-down props (via onSubmit) */

    // First, POST the todo into the database
    axios.post('/todos/add', {
      todo: todo.content
    })
    .then(res => {
      // Second, add todo to Redux Store

      // take the todo POST response database data, extract it, and use the id/content and store in the Redux Store
      todo.id = res.data.data.id
      todo.content = res.data.data.todo
      this.props.addToDoRedux(todo)
    })

  }
  render() {
    console.log(this.props.todosRedux) // logs the Redux Store
    return (
      <div className="todo-app container">
        <h1 className="center blue-text">Todo's</h1>
        <Todos todos={this.props.todosRedux} deleteTodo={this.deleteTodo} />
        <AddTodo addTodo={this.addTodo} />
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
    addToDoDB: (todo) => {dispatch({type: 'ADD_TODO_FROM_DB', todo: todo})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
