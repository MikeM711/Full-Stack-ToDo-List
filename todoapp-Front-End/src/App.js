import React, { Component } from 'react';
import TodoList from './TodoList'

class App extends Component {

  render() {
    console.log(this.props.todosRedux) // logs the Redux Store
    return (
      // Browser Router
      <div className="fulltodo-App">
        <TodoList /> {/* A PRIVATE Route */}
        {/* Login Route */}
        {/* Register Route */}
        {/* Not Found Component */}
      </div>
    );
  }
}

export default App
