import React, { Component } from 'react';
import Todos from './Todos'
import AddTodo from './AddTodo'
import {connect} from 'react-redux'
import axios from 'axios'

class App extends Component {

  componentDidMount() {

    // this function adds a todo to the database
    this.addTodoDB();
    // We may need async/await to give us time to add something to DB, before requesting all todos below

    axios.get('/todos')
      .then(res => {
        for(let i = 0; i < res.data.allToDos.length; i++){
          this.props.addToDoDB(res.data.allToDos[i]);
        }

      })
      .catch(err => console.log(err))
  }

  addTodoDB = () => {
    // let data = {
    //   todos: 'Hello From Client'
    // }
    // let request = new Request('/todos/add', {
    //   method: 'POST',
    //   headers: new Headers({ 'Content-Type': 'application/json' }),
    //   body: JSON.stringify(data)
    // });

    // axios POST request, with hard-coded data
    axios.post('/todos/add', {
      todo: 'Hello Database!'
    })
    .then(res => {
      console.log(res)
    })

    // fetch(request)
    //   .then(function(response) {
    //     response.json()
    //       .then(function(data){
    //         console.log('from fetch ' + data)
    //       })
    //   })
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
