import React, { Component } from 'react';
import Todos from './Todos'
import AddTodo from './AddTodo'
import {connect} from 'react-redux'
import axios from 'axios'

class App extends Component {

  componentDidMount() {
    // Option #1: fetch data using fetch()
    //   fetch("/todos")
    //     .then(res => res.json())
    //     .then(todosDB => console.log(todosDB));

    // Option #2: fetch data using 
    axios.get('/todos')
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err))
  }

  deleteTodo = (id) => {
    this.props.deleteToDoRedux(id)
    
  }
  addTodo = (todo) => {
    todo.id = Math.random();
    this.props.addToDoRedux(todo)
  }
  render() {
    //console.log(this.props.todosRedux)
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
