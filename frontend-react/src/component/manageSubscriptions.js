import React,{Component} from 'react';
import Navbar from '../component/Navbar';
import {api} from '../store/actions';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../App.css';

class ManageSubscription extends Component{
    constructor(props){
        super(props);
        this.state = {
            users : [],
        }
    }

    componentWillMount(){
        console.log("API : ", api);
        var headers = new Headers();
        axios({
            method:'get',
            url: `${api}/users/`,
            headers: {"Authorization" : localStorage.getItem("Authorization")}
        })
        .then((response) => {
            this.setState({
                users : this.state.users.concat(response.data)
            })
        })
    }
    
    render(){
        let userDetails = null;
        userDetails = this.state.users.map((u,index) => {
            return(
                <tr>
                    <td>{u.firstName}</td>
                    <td>{u.lastName}</td>
                    <td>{u.email}</td>
                    <td>
                        
                        {/* <Link onClick={(e) => this.handleMovieToDelete(e,u.movieId)} to="#deleteEmployeeModal" class="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete"><span class="glyphicon glyphicon-trash"></span></i></Link> */}
                        {u.subscribed ? <label class="switch">
                            <input type="checkbox" defaultChecked/>
                            <span class="slider round"></span>
                        </label> : 
                            <label class="switch">
                            <input type="checkbox"/>
                            <span class="slider round"></span>
                        </label>
                        }
                    </td>
                </tr>
            )
        })
        console.log("Users : ", this.state.users);
        return(
            <div>
                <Navbar/>
                <div class="bg-wrapper" style={{opacity : "0.25"}}> 
                    <img class="bg-img " src="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt="" />
                </div>
                <br/>
                <br/>
                <div class="table-title" style={{marginLeft:'12%', marginRight:'12%'}}>
                    <div class="row">
                        <div class="col-sm-6">
                            <h2>Manage User Subscription</h2>
                        </div>
                    </div>
                </div>
                <br/>
                <div className="table-responsive" style = {{backgroundColor : "white", marginLeft : "12%", marginRight : "12%"}}>
                    <br/>
                    <table id="myTable"  class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Manage Subscription</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userDetails}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ManageSubscription;