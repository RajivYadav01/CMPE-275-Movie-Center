import React, { Component } from 'react';
import Home from './component/Home';
import {Switch,Route} from 'react-router-dom';
import AddMovie from './component/addMovie';
import DeleteMovie from './component/deleteMovie';

class App extends Component {
  render() {
    return (
      <Switch>
            <Route exact path = '/' component = {Home}/>
            <Route exact path = '/admin/create/:movieID' component = {AddMovie}/>
            <Route exact path = '/admin/delete' component = {DeleteMovie}/>
      </Switch>
    );
  }
}

export default App;
