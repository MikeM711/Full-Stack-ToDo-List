import React, { Component } from 'react';
import Todos from './Todos'
import AddTodo from './AddTodo'
import {connect} from 'react-redux'

class App extends Component {
 
  deleteTodo = (id) => {
    this.props.deleteToDoRedux(id)
    
  }
  addTodo = (todo) => {
    todo.id = Math.random();
    this.props.addToDoRedux(todo)
  }
  render() {
    console.log(this.props)
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
    deleteToDoRedux: (id) => {dispatch({type:'DELETE_TODO', id: id })}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
