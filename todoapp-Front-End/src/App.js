import React, { Component } from 'react';
import Todos from './Todos'
import AddTodo from './AddTodo'
import {connect} from 'react-redux'
import axios from 'axios'

class App extends Component {
 
  // When the component first mounts, cycle through the todos from JSONPlaceholder
  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos/')
       .then(res => {

        // Cycle through the first 10 To-Do's
        for(let i = 0; i <= 10; i++){
          this.props.addToDoDB(res.data[i])
        }
       })

  }

  deleteTodo = (id) => {
    this.props.deleteToDoRedux(id)
    
  }
  addTodo = (todo) => {
    todo.id = Math.random();
    this.props.addToDoRedux(todo)
  }
  render() {
    console.log(this.props.todosRedux)
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
