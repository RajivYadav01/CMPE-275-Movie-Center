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
            displayName : '',
            userId : '',
            isSubscribed : '',
            subscriptionEndDate : ''
        }
    }

    handleSubmit = (e, formTitle) => {
        e.preventDefault();
        console.log("Inside Submit");
        var userDetails = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            displayName: this.state.displayName,
            email: this.state.email,
            userId: this.state.userId,
        }
        console.log("Update user details : ", userDetails);
        this.props.onSubmitClicked(userDetails);
    }

    componentWillMount(){
        var userId = localStorage.getItem("userId");
        this.props.onLoadUser(userId);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.status === 'USER_SUCCESS') {
          this.setState({
            firstName: nextProps.msg.firstName,
            lastName: nextProps.msg.lastName,
            email: nextProps.msg.email,
            userId: nextProps.msg.userId,
            displayName : nextProps.msg.displayName,
            isSubscribed: nextProps.msg.subscribed,
            subscriptionEndDate: nextProps.msg.subscriptionEnddate,
          });
        }
      }

    handleChange = (events) => {
        if(events.target.name === "firstname"){
            this.setState({
                firstName : events.target.value
            });
           
        }
        if(events.target.name === "displayname"){
            this.setState({
                displayName : events.target.value
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
    };

    render(){
        let subscription = null;
        let customerSince = false;
        console.log(this.state);
        let userType = localStorage.getItem("userType");
        if(userType != "admin"){
            customerSince = true;
            if(this.props.msg.subscribed === false){
                subscription = (
                     <p>
                         <Link to='/payment' className="btn btn-default btn-lg btn-success" >
                             Start Subscription
                         </Link>
                     </p>
                );
            } else if(this.props.msg.subscribed === true){
                subscription = (
                     <p className="md-text">Subscription ending on: <span className="bold">
                         {this.props.msg.subscriptionEnddate}</span>
                     </p>
               )
            }
        }
        
        return(
            <div >
                <Navbar/>
                <div className = "profile-body full-body">
                <div class="content-md">
                   <h1>Account</h1>
                   <div class="row profile-content">
                        <div class="col-sm-3 profile-label">
                            <p>Display name:</p>
                            <p>First name:</p>
                            <p>Last name:</p>
                            <p>Email:</p>
                        </div>
                        <div class="col-sm-5 profile-values">
                            <p>{this.props.msg.displayName}&nbsp;</p>
                            <p>{this.props.msg.firstName}&nbsp;</p>
                            <p>{this.props.msg.lastName}&nbsp;</p>
                            <p>{this.props.msg.email}&nbsp;</p>
                        </div>
                        <div class="col-sm-4 profile-actions">
                        <p><button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#updateModal">Update account details</button></p>
                        {subscription}
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
                            <div className="form-group">
                            <label>Display Name:</label>
			    				<input onChange = {this.handleChange} value={this.state.displayName} className="inputField form-control" type="text" name="displayname" id="displayname" required="required" />
			    			</div>

                            <label>Email Address:</label>
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
    if(state.status == 'USER_UPDATE_SUCCESS'){
        alert("Updated user");
    }
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