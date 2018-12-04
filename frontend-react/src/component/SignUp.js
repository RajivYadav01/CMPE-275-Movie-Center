import React,{Component} from 'react';
import Navbar from '../component/Navbar';
import {connect} from 'react-redux';
import {CreateUser} from '../store/actions';
import {Link} from 'react-router-dom';
import '../App.css';
import axios from 'axios';

import {api} from '../store/actions';

class SignUp extends Component{
    constructor(props){
        super(props);

        this.state = {
            firstName : '',
            lastName : '',
            email : '',
            password : '',
            userType : ''
        }
    }

    handleChange = (events) => {
        if(events.target.name === "firstname"){
            this.setState({
                firstName : events.target.value
            });
           
        }
        if(events.target.name === "lastname"){
            this.setState({
                lastName : events.target.value
            });
        }
        
        if(events.target.name === "password"){
            this.setState({
                password : events.target.value
            });
        }

        if(events.target.name === 'email'){
            this.setState({
                email: events.target.value
            });
            if(events.target.value.endsWith("@sjsu.edu")){
                this.setState({
                    userType: "admin"
                });
            } else {
                this.setState({
                    userType: "customer"
                });
            }
        }
    }
    handleSubmit = (e, formTitle) => {
        e.preventDefault();
        console.log("Inside Submit");
        var newUserDetails = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            userType: this.state.userType
        }
        console.log("New User Deatils : ", newUserDetails);
        this.props.onSubmitClicked(newUserDetails);
    }

    render(){
        let errorMsg = null;
        if(this.props.status == "SUCCESS"){
            this.props.history.push("/signupconfirmation");
        }
        if(this.props.status == "ERROR"){
            errorMsg = (
                <div className="error-msg">
                   Something went wrong
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
                    <div class="sign-up-form">
                        <h4 className = "h4Label">Sign Up</h4>
                        <br/>
                        <form onSubmit = {this.handleSubmit.bind(this)}>
			    			<div className="form-group">
			    				<input onChange = {this.handleChange} className="inputField form-control" type="email" name="email" id="email" required="required" placeholder="Email Address"/>
			    			</div>

                            <div className="form-group">
			    				<input onChange = {this.handleChange} className="inputField form-control" type="text" name="firstname" id="firstname" required="required" placeholder="First Name"/>
			    			</div>

                            <div className="form-group">
			    				<input onChange = {this.handleChange} className="inputField form-control" type="text" name="lastname" id="lastname" required="required" placeholder="Last Name"/>
			    			</div>

                            <div className="form-group">
			    				<input onChange = {this.handleChange} className="inputField form-control" type="password" name="password" id="password" required="required" placeholder="Password"/>
			    			</div>
                            <br/>
			    			<input type="submit" value="Create Account" className=" signUpBtn btn btn-primary form-control"/>
			    		</form>
                            <br/>
                
                            <br/><br/>
                            <div class="help-text">Already a member?<a href = {`/signin`}> Sign In</a></div>
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
        onSubmitClicked : (details) => dispatch(CreateUser(details)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUp);