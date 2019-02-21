import React, { Component } from 'react'
import SingleTodo from './SingleTodo'

/* 
The Complete list of todos
Cycles through all SingleTodo components - which hold each todo
*/

class Todos extends Component {

  todoList = () => {
    const { todos, deleteTodo } = this.props
    const toDosMap = todos.length ? (
      todos.map(singleTodo => {
        /* Returning a key is necessary when we do some form of iteration process
        'key' property doesn't pass anything into the component, it just makes React happy
        That's why I passed 'id' with the same value as 'key'
        */
        // When the single iteration of .map() is complete, return your values in order to store them, as intended by .map()
        return (
          <SingleTodo
            todo={singleTodo.content}
            deleteTodo={deleteTodo}
            key={singleTodo.id}
            id={singleTodo.id}
          />
        )
      })
    ) : (
        <p className="center">You have no todo's left, yay!</p>
      )

    return toDosMap
  }

  render() {
    return (
      <div className="todos collection">
        {/* Initialize the function */}
        {this.todoList()}
      </div>
    )
  }
}

export default Todos;

