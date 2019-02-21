import React, { Component } from 'react';

class Todos extends Component {

  // I can probably make this better...
  todoList = () => { 
    const {todos, deleteTodo} = this.props
    const toDosMap = todos.length ? (
    todos.map(todo => {
      return (
        <div className="collection-item" key={todo.id}>
          <span onClick={() => {deleteTodo(todo.id)}}>{todo.content}</span>
        </div>
      )
    })
  ) : (
    <p className="center">You have no todo's left, yay!</p>
  );
  return toDosMap
  }

  render() {
    return (
    <div className="todos collection">
      {/* Is this function OK?*/}
      {this.todoList()}
    </div>
    )}
}

export default Todos;
