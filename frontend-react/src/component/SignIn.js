import React,{Component} from 'react';
import Navbar from '../component/Navbar';
import {connect} from 'react-redux';
import {SignInAction} from '../store/actions';
import {Link, Redirect} from 'react-router-dom';
import '../App.css';
import axios from 'axios';

import {api} from '../store/actions';

class SignIn extends Component{
    constructor(props){
        super(props);

        this.state = {
            email : '',
            password : ''
        }
    }

    handleChange = (events) => {
       
        if(events.target.name === "password"){
            this.setState({
                password : events.target.value
            });
        }

        if(events.target.name === 'email'){
            this.setState({
                email: events.target.value
            });
        }
        console.log("Temp data : " + events.target.value); 
    }
    handleSubmit = (e, formTitle) => {
        e.preventDefault();
        console.log("Inside Submit");
        var userDetails = {
            email: this.state.email,
            password:this.state.password
        }
        console.log("New user Deatils : ", userDetails);
        this.props.onSubmitClicked(userDetails);
        console.log(this.props.status);
    }

    render(){
        let errorMsg = null;
        if(this.props.status == "LOGIN_SUCCESS"){
            this.props.history.push("/");
        }
        if(this.props.status == "LOGIN_ERROR"){
            errorMsg = (
                <div className="error-msg">
                   {this.props.msg}
                </div>
            );
        }
        return(
             
            <div class="main-app">
                <div class="bg-wrapper">
                    <img class="bg-img " src="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt="" />
                </div>
                <div class="header-wrapper">
                    <a href="/" class="main-header">
                        Movie Center
                    </a>
                </div>
                <div className = "main-center">
                    <div class="sign-in-form">
                        <h4 className = "h4Label">Sign In</h4>
                        <br/>
                        {errorMsg}
                        <form onSubmit = {this.handleSubmit.bind(this)}>
			    			<div className="form-group">
			    				<input onChange = {this.handleChange} className="inputField form-control" type="email" name="email" id="email" required="required" placeholder="Email Address"/>
			    			</div>
                            <div className="form-group">
			    				<input onChange = {this.handleChange} className="inputField form-control" type="password" name="password" id="password" required="required" placeholder="Password"/>
			    			</div>
                            <br/>
			    			<input type="submit" value="Sign In" className=" signUpBtn btn btn-primary form-control"/>
			    		</form>
                            <br/>
                
                            <br/><br/>
                            <div class="help-text">New to Movie Center?<a href = {`/signup`}> Sign Up</a></div>
                        </div>
                    </div>
            </div> 
        )
    }
}
const mapStateToProps = state => {
    console.log(state); // state
    return {
        status: state.status,
        msg: state.msg
    };
};

const mapDispatchToProps = dispatch => {
    console.log("Inside map dipatch to props");
    return{
        onSubmitClicked : (details) => dispatch(SignInAction(details)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);