import React, { Component } from 'react';
import Home from './component/Home';
import {Switch,Route} from 'react-router-dom';
import AddMovie from './component/addMovie';
import SignUp from './component/SignUp';
import SignUpConfirmation from './component/SignUpConfirmation';
import EmailVerification from './component/EmailVerification';
import SignIn from './component/SignIn';
import UserProfile from './component/UserProfile';
import DeleteMovie from './component/deleteMovie';
import Filter from './component/filter';
import MovieDetails from './component/movieDetails';
import Payment from "./component/payment";

class App extends Component {
  render() {
    return (
      <Switch>
            <Route exact path = '/' component = {Home}/>
            <Route exact path = '/admin/create/:movieID' component = {AddMovie}/>
            <Route exact path = '/admin/delete' component = {DeleteMovie}/>
            <Route exact path = '/signup' component = {SignUp}/>
            <Route exact path = '/signupconfirmation' component = {SignUpConfirmation}/>
            <Route exact path = '/verifyemail' component = {EmailVerification}/>
            <Route exact path = '/profile' component = {UserProfile}/>
            <Route exact path = '/signin' component = {SignIn}/>
            <Route exact path = '/filter' component = {Filter}/>
            <Route exact path = '/movieDetails/:movieID' component = {MovieDetails}/>
            
            <Route exact path = '/payment' component = {Payment}/>
      </Switch>
    );
  }
}

export default App;
