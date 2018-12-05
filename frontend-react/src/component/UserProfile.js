import React,{Component} from 'react';
import Navbar from './Navbar';
import {connect} from 'react-redux';
import {UpdateUser, GetUserDetail} from '../store/actions';
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
            userId : ''
        }
    }

    handleSubmit = (e, formTitle) => {
        e.preventDefault();
        console.log("Inside Submit");
        var newUserDetails = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            userId: this.state.userId
        }
        console.log("Update user details : ", newUserDetails);
        this.props.onSubmitClicked(newUserDetails);
    }

    componentWillMount(){
        var userId = localStorage.getItem("userId");
        this.props.onLoadUser(userId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status == 'USER_SUCCESS') {
          this.setState({
            firstName: nextProps.msg.firstName,
            lastName: nextProps.msg.lastName,
            email: nextProps.msg.email,
            userId: nextProps.msg.userId
          });
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
        
        if(events.target.name === 'email'){
            this.setState({
                email: events.target.value
            });
        }
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
                            <label>Email address:</label>
			    				<input onChange = {this.handleChange} value={this.state.email} className="inputField form-control" type="email" name="email" id="email" required="required" />
			    			</div>

                            <div className="form-group">
                            <label>First Name:</label>
			    				<input onChange = {this.handleChange} value={this.state.firstName} className="inputField form-control" type="text" name="firstname" id="firstname" required="required" />
			    			</div>

                            <div className="form-group">
                            <label>Last Name:</label>
			    				<input onChange = {this.handleChange} value={this.state.lastName} className="inputField form-control" type="text" name="lastname" id="lastname" required="required" />
			    			</div>

                        
                            <br/>
			    			<input type="submit" value="Update " className=" signUpBtn btn btn-primary form-control"/>
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
        msg: state.msg,
    };
    
};

const mapDispatchToProps = dispatch => {
    console.log("Inside map dipatch to props");
    return{
        onSubmitClicked : (details) => dispatch(UpdateUser(details)),
        onLoadUser : (details) => dispatch(GetUserDetail(details))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);