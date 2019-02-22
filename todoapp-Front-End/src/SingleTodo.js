import React, { Component } from 'react'

// A component for each singular todo
// We will call the singular todo content, the 'title' in this component

class SingleTodo extends Component {

  /* 
  In order to update a todo in Redux or a Database, we need to know its 'content' AND its 'id'
    PUT request criteria is basically like (POST + DELETE) criteria
  */

  /* 
  Brainstorming - Instances when "editing-mode" needs to be toggled:

  1) If checkbox is clicked, the component should restructure itself by replacing the todo 'title' with an editing input-element
    This begins "editing-mode"
  2) If ENTER key is pressed during edit, this should end "editing mode"

  #2 Must be handled by a function that will listen for KEY PRESSES
    More specifically - listening for the ENTER key
    When ENTER key is pressed - send the data and end "editing-mode"

  Functions only have access to variables in props and state.
    Want a function to know that we are editing? Toss it in the state.
    We will need to toss an 'isEditing' true/false toggle inside the state, so that handleUpdateEnter() is able to use that variable
  
  Default isEditing is false: initially, we will not be editing anything - unless the user specifies to edit something
  */

  /* State:
    isEditing variable to be accessible for the handleUpdateEnter() function
    title and id values for updating the todo in Redux/DB
  */
  state = {
    isEditing: false,
    todo: {
      title: '',
      id: this.props.id,
    }
  };

  /* 
  handleEditing is hooked up to our checkbox
  When fired, handleEditing will switch 'isEditing' inside the state from:
    false -> true , or, true -> false.
  Think of it like a light switch.
    Clicking this the first time will visually restructure our app, because our ternary operator in the render() has an 'isEditing' condition that outputs different JSX for true/false 'isEditing'
  */
  handleEditing = () => {
    const { isEditing } = this.state;
    this.setState({
      isEditing: !isEditing,
    });
    /* NOTE: It takes time for the state to update
    So logging 'isEditing' in the console here will not be correct, it will only be correct at the instantaneous instance */
  }

  // Listening to every change in VALUE of the "editTitle" field
  handleTitleChange = (event) => {
    // Get the element's instantaneous value
    const value = event.target.value
    /* 
    Update the value of the 'todo' title on the state, at every change in value
      In other words: if a character is added/deleted inside the input, put that value inside the state
    */

    /* 
    Update the state's 'todo' property.
    Problem:
      The state will not replace state PROPERTIES, but it DOES replace state VALUES
    Solution:
      ...spread the 'todo' state property, and add in the new 'title' of the todo
    */

    this.setState({
      todo: {
        ...this.state.todo,
        title: value
      }
    })
  }

  // Listening to all key presses of the "editTitle" field
  /* 
  This CANNOT substitute for handleTitleChange (sending the value of the input element into the state) because:
    1. All key presses are explicitly stated
      ex: click Shift and console will log 'Shift'
    2. Only singular keys are logged, NOT the full element value
  */

  /* Main purpose: detect "ENTER" key and do the following:
    1. Send the new 'todo' out of the component, into a function that will dispatch the data off to the Redux Store/modify the database
    2. Switch off "edit-mode"
  */
  handleUpdateEnter = (event) => {
    /* 
    Execution enters here on every key press
      Unlike handleTitleChange(), where execution enters on every value change
    Theory: If used properly, execution is in here more times than handleTitleChange() - (because of ENTER key and SHIFT key... and possible other keys)
    */

    /* If ENTER has been pressed during edit: 
      1. Take the state's 'todo' (with it's title and id), and bring it outside of the function
      2. Update the state, and turn isEditing to false
        The only way this function is able to acquire the 'isEditing' variable and toggle it to FALSE is because it's on the state.
        If 'isEditing' was ONLY inside render(), we can not acquire the 'isEditing' variable
    */
    if (event.key === 'Enter') {
      this.props.updateTodo(this.state.todo);
      this.setState({
        isEditing: false,
      });
    }
  }

  // render the singular todo to the browser
  render() {

    const { title, id } = this.props
    const { isEditing } = this.state

    return (
      <div className="collection-item">
        {/* the title can be two things:
      1: Simply the title
      2: A user input 'edit' of the title
      Answer: Ternary Operator to cycle between true/false editing
      */}

        {
          isEditing ? (
            // TRUE - Component is in "edit" mode
            /* If we want to edit, change the todo into an input label!
            Label will be of type 'text'*/
            <input
              type="text"
              className="editTitle"
              // onChange fires when the value of the element is changed
              // Objective: Listen for change in VALUE of the input element
              onChange={this.handleTitleChange}
              /* onKeyDown is fired for all keys, not just when the value of the input has changed 
              Objective: Listen for KEY-PRESS 
                More specifically - ENTER key*/
              // used onKeyDown instead of onKeyPress
              onKeyDown={this.handleUpdateEnter}

              // for a good user experience, use the original todo as the default value, for this label
              defaultValue={title}
              // Immediately have cursor on that "editing" element, ready to type
              autoFocus
            />
          ) : (
              // FALSE - component is in "non-edit" mode
              // if we don't want to edit, deliver the simple todo 'title'
              <span >{title}</span>
            )
        }

        {/* Boilerplate of Materialize Checkbox */}
        <form action='#'>
          <p>
            <label className="edit-field">
              <input
                type="checkbox"
                className="filled-in"
                
                /* 'checked' property is simply used for proper visual user-experience 
                It is needed to toggle: 
                  False: Checkbox is unchecked - user knows they are not editing
                  True: Checkbox is checked, - user knows they are editing
                The application works without it, but visually, the app will look broken
                */
                checked={this.state.isEditing}
                /* 'onChange' property listens to user 'checkbox' actions
                It will tell the entire component that it should switch to "edit" or "non-edit" mode 
                  Actually fires-up the ternary operator
                */
                
                /* When to fire handleEditing function: 
                  When checkbox is toggled true or false */
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