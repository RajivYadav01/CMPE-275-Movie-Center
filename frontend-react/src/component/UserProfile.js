import React,{Component} from 'react';
import Navbar from './Navbar';
import {connect} from 'react-redux';
import {CreateUser} from '../store/actions';
import {GetLoggedInUser} from '../store/actions';
import {Link} from 'react-router-dom';
import '../App.css';
import axios from 'axios';

import {api} from '../store/actions';

class UserProfile extends Component{
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

    componentWillMount(){
        this.props.onLoadUser();
    }

    render(){
        
        return(
             
            <div >
            
                <Navbar/>
                <div className = "profile-body full-body">
                <div class="content-md">
                   <h1>Account</h1>
                   <div class="row profile-content">
                        <div class="col-sm-2 profile-label">
                            <p>First name:</p>
                            <p>Last name:</p>
                            <p>Email:</p>
                        </div>
                        <div class="col-sm-6 profile-values">
                            <p>{this.props.msg.firstName}</p>
                            <p>{this.props.msg.lastName}</p>
                            <p>{this.props.msg.email}</p>
                        </div>
                        <div class="col-sm-4 profile-actions">
                        <p><button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#updateModal">Update account details</button></p>
                        <p><a href={`/payment`} class="btn btn-default btn-lg" >Start Subscription</a></p>
                        </div>
                    </div>
                  
                </div>
                
                </div>
                <div id="updateModal" class="modal fade" role="dialog">
                    <div class="modal-dialog modal-lg">

                        <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Update User</h4>
                        </div>
                        <div class="modal-body">
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
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                        </div>

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
        onLoadUser : (details) => dispatch(GetLoggedInUser(details))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);