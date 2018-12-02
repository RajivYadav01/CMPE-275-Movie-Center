import React,{Component} from 'react';
import Navbar from '../component/Navbar';
import {connect} from 'react-redux';
import {SignInAction} from '../store/actions';
import {Link} from 'react-router-dom';
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
        console.log("New Movie Deatils : ", userDetails);
        this.props.onSubmitClicked(userDetails);
    }

    render(){
       
        return(
             
            <div>
            
                <div className = "mainCenter">
                    <div>
                        <h4 className = "h4Label">Sign Up for free today!</h4>
                        <br/>
                        <form onSubmit = {this.handleSubmit.bind(this)}>
			    			<div className="form-group">
			    				<input onChange = {this.handleChange} className=" inputField form-control" type="email" name="email" id="email" required="required" placeholder="Email Address"/>
			    			</div>
                            <div className="form-group">
			    				<input onChange = {this.handleChange} className="inputField form-control" type="password" name="password" id="password" required="required" placeholder="Password"/>
			    			</div>
                            <br/>
			    			<input type="submit" value="Create Account" className=" signUpBtn btn btn-primary form-control"/>
			    		</form>
                            <br/>
                            
                            <br/><br/>
                            <h5>Not a a Neflix member?<a>Sign Up</a></h5>
                        </div>
                    </div>
            </div> 
        )
    }
}

const mapDispatchToProps = dispatch => {
    console.log("Inside map dipatch to props");
    return{
        onSubmitClicked : (details) => dispatch(SignInAction(details)),
    }
}

export default connect(null,mapDispatchToProps)(SignIn);