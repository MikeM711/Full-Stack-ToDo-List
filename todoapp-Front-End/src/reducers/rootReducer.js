const initState = {
   todos: [
      { id: 1, content: 'buy some milk' },
      { id: 2, content: 'play mario kart' }
   ]
}

const rootReducer = (state = initState, action) => {
   if (action.type === 'ADD_TODO'){
      const newtodos = [...state.todos,action.todo]
      return{
         ...state,
         todos: newtodos
      }
   }
 
   //console.log(action)
   if (action.type === 'DELETE_TODO'){
      const newtodos = state.todos.filter(todo => {
      return action.id !== todo.id
    });

    return {
       ...state,
       todos: newtodos
    }
   }
   return state
}

export default rootReducer