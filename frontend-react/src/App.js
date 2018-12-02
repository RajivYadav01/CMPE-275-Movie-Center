import React, { Component } from 'react';
import Home from './component/Home';
import {Switch,Route} from 'react-router-dom';
import AddMovie from './component/addMovie';
import SignUp from './component/SignUp';
import SignIn from './component/SignIn';
import DeleteMovie from './component/deleteMovie';
import Filter from './component/filter';

class App extends Component {
  render() {
    return (
      <Switch>
            <Route exact path = '/' component = {Home}/>
            <Route exact path = '/admin/create/:movieID' component = {AddMovie}/>
            <Route exact path = '/admin/delete' component = {DeleteMovie}/>
            <Route exact path = '/users/signup' component = {SignUp}/>
            <Route exact path = '/users/signin' component = {SignIn}/>
            <Route exact path = '/filter' component = {Filter}/>
      </Switch>
    );
  }
}

export default App;
