import React, { Component } from 'react';

class Todos extends Component {
  state = {
    isEditing: false,
  };

  // PROBLEM: When we click one checkbox, all of them are clicked
  // We need to click a SINGULAR todo - Create another component
  handleEditing = (id) => {
    const { isEditing } = this.state;
    this.setState({ 
      isEditing: !isEditing 
    });
    console.log('checked! Editing is ' + this.state.isEditing)
  }

  // I can probably make this better...
 todoList = () => {
   const toDosMap = this.props.todos.length ? (
   this.props.todos.map(todo => {
     return (
       <div className="collection-item" key={todo.id}>
         <span >{todo.content}</span>

         <form action="#">
           <p>
             <label>
               <input
                 type="checkbox"
                 className="filled-in"
                checked={this.state.isEditing}
                onChange={() => {this.handleEditing(todo.id) }}
               />
               <span>Edit</span>
             </label>
             <a
               className=" red lighten-3 waves-effect waves-light btn-small delete-btn"
               onClick={() => { this.props.deleteTodo(todo.id) }}>Delete</a>
           </p>

         </form>

         {/* 
           <input
           type="checkbox"
           name="edit"
           checked={isEditing}
           onChange={this.handleEditing}
           />
         */}
        
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
        {this.todoList()}

      </div>
    )
  }
}

export default Todos;

