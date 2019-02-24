const initState = {
   todos: [
      // { id: 1, content: 'buy some milk' },
      // { id: 2, content: 'play mario kart' }
   ]
}

/* 
This function creates a shallow copy of a state property in the the Redux Store
  In this case, the 'todos' property of the Redux state is copied and set to a variable
Function finds and replaces an item inside the new "copied state property value" variable
  Thus, that same variable holds the updated Redux state property
Function returns the "updated Redux Store state property value" variable, with the updated item 'content' along with the existing 'id' it had before
*/
const findAndReplace = (updatedItem, state) => {
  
  /*
  state = The full Redux Store state
    Example:
      todos: [
        { id: 1, content: 'buy some milk' },
        { id: 2, content: 'play mario kart' },
        { id: 3, content: 'learn React' }
      ]
  updatedItem - a complete todo to be updated
    Example:
      { content: 'sleep a lot', id: 2 }
    Thus, 'play mario kart' will be replaced with 'sleep a lot'
  */
  
  /* 
  We must, NON-DESTRUCTIVELY, copy the current state property VALUE that we wish to update
    AKA make a BRAND NEW array
      Create a new copy of an array, while not touching the content of input array
    We do this by ...spread, empty slice(), or filter()
    We will use slice()
      [...state.todos] also works
  OBJECTIVE: 
    1. state.todos stays at the same value throughout
    2. New variable holds modified state.todo
      a. New variable can be modified, while state.todos stays the same! THIS IS GOOD!
  */ 

  // Copying the state Non-destructively
  const todosCopy = state.todos.slice();

  /* 
  forEach() iterates through an array of items, and fires a function for each individual item
  The function: We want to check each state item for an 'id' that is equal to the updated todo 'id'
    If statement: if the 'id' is equal, delete the item inside the copied array, AND also add the updated item in its place
  */

 //forEach params: (currentValue, index, array)
  todosCopy.forEach((currValue, idx) => {

    /* Goal: if the todosCopy array (a shallow state.todos copy) that we are iterating, has an element of 'id' = todo 'id'
      Delete that element and insert the new element, that we have named: 'updatedItem'
      NOTE: that state.todos is NOT getting modified throughout this process! = THIS IS GOOD!
    */

   // 1. Find the item
    if (currValue.id === updatedItem.id) {

      // splice params: (start, deleteCount, newElement1, ...)

      /*
      2. Remove the item with: todosCopy.splice(idx, 1,)
        Where 1st param: idx is the current spot of the array in the iteration
        2nd param: the # of array elements to remove, number of elements after idx
      */

      /* 
      3. Insert the new item 'updatedItem' in the place of 'deleted item(s)' index 
        Use the 3rd param to insert the todo: 'updatedItem'
      */

      todosCopy.splice(idx, 1, updatedItem);
    }
  });
  return todosCopy;
};

const rootReducer = (state = initState, action) => {
  
  if (action.type === 'ADD_TODO'){
      const newtodos = [...state.todos,action.todo]
      return{
         ...state,
         todos: newtodos
      }
   }

   if (action.type === 'DELETE_TODO'){
      const newtodos = state.todos.filter(todo => {
      return action.id !== todo.id
    });

    return {
       ...state,
       todos: newtodos
    }
   }

  if (action.type === 'ADD_TODO_FROM_DB') {
    
   // Present results in an object similar to our state
    const todo = {
      content: action.todo.todo,
      id: action.todo.id,
    }

    const newtodos = [...state.todos, todo]

    return {
      ...state,
      todos: newtodos
    }
  }

  if(action.type === 'UPDATE_TODO') {

    //console.log(findAndReplace(action.fullTodo, state))

    /* 
    Goal: find the todo inside the Redux Store's state (using the 'id')
      Delete the item with that 'id'
      Insert the new item (that has with the new 'content' and existing 'id' at that particular spot.
    
      1st: non-destructively copy the Redux Store's state using slice()
      2nd: Find the id we want to replace in the copy
      3rd: Delete the item of that id using the 1st and 2nd param of split()
      4th: Insert the updated item of that id (new content, old 'id' number) using the 3rd param of split()
    */

   return {
      ...state,
      todos: findAndReplace(action.fullTodo, state),
    };
  }

   return state
}

export default rootReducer