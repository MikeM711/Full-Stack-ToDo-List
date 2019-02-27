import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import TodoList from './TodoList';
import Login from './Login';
import Register from './Register';
import NotFound from './NotFound';

class App extends Component {

  render() {
    console.log(this.props.todosRedux) // logs the Redux Store
    return (
      /* 
      The entire application is surrounded by <BrowserRouter>
      Thanks to BrowserRouter, we can add <Route> tags inside it
      */
      <BrowserRouter>
        <div className="fulltodo-App">

          {/* Use Switch tag to load up ONE Component at a time by surrounding the <Route> tags with <Switch>*/}

          {/* <Switch> Tag
            When we type something in the URL, or when we link (redirect) to something: 
              <Switch> will look at the URL, it will start at the top of the stack of Routes, and go down one at a time
              Once we find a path that matches the URL, search will stop and that ONE component will load
            With/Without <Switch> tag:
              Without the <Switch> tag: React will match as many paths/routes as it could, and will load on ALL of those components up
              With the <Switch> tag: we are only matching the first one we find
            */}

          <Switch>

            {/* Route Syntax: <Route path='' component={}></Route>*/}

            {/* Use exact path ='/' for loading the TodoList
              If we don't, any link that has '/' in its URL will load the TodoList and execution will stop
              We don't need 'exact path' for the rest of the paths, because path names are specific enough
            Theory:
              If the TodoList route was path '/a', ONLY the URL '/a' will load up that component
              The URL '/apple' will NOT load up that component
              Something about ending with backslash '/' makes that path ambiguous
                path= '/login' and path='/login/' shows no difference
            */}

            <Route exact path='/' component={TodoList}></Route> 
              {/* Future: This will be A PRIVATE Route */}
            <Route path='/login' component={Login}></Route>
            <Route path='/register' component={Register} ></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App