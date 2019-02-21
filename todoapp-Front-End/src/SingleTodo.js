import React, { Component } from 'react'

// A component for each singular todo

class SingleTodo extends Component {

  state = {
    isEditing: false,
  };

  /* 
  When fired, handleEditing will switch 'isEditing' inside the state from:
  false -> true , or, true -> false.
  Think of it like a light switch. 
  */
  handleEditing = () => {
    const { isEditing } = this.state;
    this.setState({
      isEditing: !isEditing
    });
    /* It takes time for the state to update
    So logging 'isEditing' in the console here will not be correct, it will only be correct at the instantaneous instance */
  }

  // render the singular todo to the browser
  render() {
    //console.log('activated! Editing is now ' + this.state.isEditing)
    const { todo, id } = this.props
    return (
      <div className="collection-item">
        <span >{todo}</span>

        {/* Boilerplate of Materialize Checkbox */}
        <form action="#">
          <p>
            <label className="input-field">
              <input
                type="checkbox"
                className="filled-in"
                /* checked is toggled true or false */
                checked={this.state.isEditing}
                /* fire handleEditing function when checked is toggled true or false */
                onChange={() => { this.handleEditing(id) }}
              />
              <span className="edit-text">Edit</span>
            </label>
            <a
              className="red lighten-3 waves-effect waves-light btn-small delete-btn"
              onClick={() => { this.props.deleteTodo(id) }}>Delete</a>
          </p>
        </form>

      </div>
    )
  }
}

export default SingleTodo;