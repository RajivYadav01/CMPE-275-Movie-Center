import React,{Component} from 'react';
import axios from 'axios';
import {api} from '../store/actions';
import '../css/useractivity.css';
// import {Link} from "react-router-dom";
import Navbar from '../component/Navbar';
import Pagination from './Pagination';

class UserActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            moviePlayingHistory: [],
            periodToShow: "",
            toptenusers: [],
            message: '',
            pageOfItems: [],
            selectedUser : null
        }
        this.handleMoviePlayHistoryClick = this.handleMoviePlayHistoryClick.bind(this);
        this.handlePeriodClick = this.handlePeriodClick.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentWillMount() {
        var header = new Headers();
        
        axios.get(`${api}/users/`, {
            headers: {"Authorization" : localStorage.getItem("Authorization")}
        })
        .then((response)=>{
            console.log(response.data);
            if(response.data.length == 0) {
                this.setState({
                    message: 'No statistics available'
                })    
            } else {
                this.setState({
                    users: response.data,
                    message: ''
                })
            }
        })
    }

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems});
    }

    handleMoviePlayHistoryClick = (e, user) => {
        e.preventDefault();
        console.log("User Id: "+ user.userId);
        this.props.history.push(`/admin/usermovieplayinghistory/${ user.userId }`);
    }

    

    handlePeriodClick = (period) => {
        console.log(period);
        console.log("Printing in TopTenUsersByPeriod:",period);
        axios.get(`${api}/admin/toptenusers?period=${period}`, {
            headers: {"Authorization" : localStorage.getItem("Authorization")}
        })
        .then((response)=>{
            console.log("Printing in TopTenUsersByPeriod:",response.data);
            if(response.data.length == 0) {
                console.log("Show message");
                this.setState({
                    message: 'No statistics available',
                    toptenusers: []
                })    
            } else {
                this.setState({
                    toptenusers: response.data,
                    message: ''
                })
            }

        })
    }
    handleUserDetails = (e,user) => {
        e.preventDefault();
        this.setState({
            selectedUser : user
        })
        document.getElementById("userDetailsButton").click();
    }
    render() {

        let userDetails = null;
        if(this.state.users.length != 0) {
            userDetails = this.state.pageOfItems.map((user)=>{
                return (
                    <tr key={user.userId}>
                        <td><a style = {{cursor : "pointer"}} onClick={(e) => this.handleUserDetails(e,user)}>{user.firstName}</a></td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>
                            <button 
                                type="button" 
                                className="btn btn-link"
                                onClick={(e) => this.handleMoviePlayHistoryClick(e, user)}>movie playing history</button>
                            {/* <Link className='text-dark' to={`/usermovieplayinghistory/${ user.userId }`}>Movie playing history</Link> */}
                        </td>
                    </tr>
                )
            })
    
        }
                
        let topTenUsersByPeriod = null;
        if(this.state.toptenusers.length != 0) {
            topTenUsersByPeriod = this.state.toptenusers.map((user)=>{
                return (
                    <tr key={user.userId}>
                        <td><a style={{cursor : "pointer"}} onClick={this.handleUserDetails}>{user.firstName}</a></td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>
                            <button 
                                type="button" 
                                className="btn btn-link"
                                onClick={(e) => this.handleMoviePlayHistoryClick(e, user)}>movie playing history</button>
                            {/* <Link className='text-dark' to={`/usermovieplayinghistory/${ user.userId }`}>Movie playing history</Link> */}
                        </td>
                    </tr>
                )
            })
        }
        

        return(
            <div className="UserActivity">
                <Navbar/>
                <div class="bg-wrapper" style={{opacity : "0.25"}}> 
                    <img class="bg-img " src="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt="" />
                </div>
                <br/>
                <br/>
                <div class="table-title" style={{marginLeft:'12%', marginRight:'12%'}}>
                    <div class="row">
                        <div class="col-sm-6">
                            <h2>User Activity</h2>
                        </div>
                    </div>
                </div>
                <div style={{marginLeft:'12%', marginRight:'12%'}}>
                    <div className="table-responsive" style={{backgroundColor: "white"}}>
                        <table id="myTable" className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Movie Play History</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userDetails}
                            </tbody>
                        </table>
                    </div>
                    <Pagination items={this.state.users} onChangePage={this.onChangePage} />
                </div>

                <br />
                <br />

                <div class="table-title" style={{marginLeft : "12%", marginRight : "12%"}}>
                    <div class="row">
                        <div class="col-sm-6">
                            <h2>Select period to view top ten users</h2>
                        </div>
                    </div>
                </div>

                <div style={{marginLeft:'12%', marginRight:'12%'}}>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-secondary" onClick={() => this.handlePeriodClick('last24hours')}>Last 24 hours</button>
                        <button type="button" class="btn btn-secondary" onClick={() => this.handlePeriodClick('lastweek')}>Last Week</button>
                        <button type="button" class="btn btn-secondary" onClick={() => this.handlePeriodClick('lastmonth')}>Last Month</button>
                    </div>
                    
                </div>

                <br />
                <br />

                <div style={{marginLeft:'12%', marginRight:'12%'}}>
                    <div className="table-responsive" style={{backgroundColor: "white"}}>
                        <table id="myTable" className="table table-striped table-hover">
                            <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Movie Play History</th>
                            </tr>
                            </thead>
                            <tbody>
                            {topTenUsersByPeriod}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <p style={{color: 'white', font: '20px'}}>{ this.state.message }</p>
                    </div>
                </div>
                <button id="userDetailsButton" href="#userDetailsModal" class="delete" data-toggle="modal" style={{display : "none"}} type="button" class="btn btn-success">
                    Show User Details
                </button>
                <div id="userDetailsModal" class="modal fade">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <form>
                                <div class="modal-header">						
                                    <h4 class="modal-title">User Details</h4>
                                </div>
                                {this.state.selectedUser !== null ?
                                <div class="modal-body">						
                                    <h4 class="modal-title">First Name</h4>
                                    <h4 style = {{fontWeight : "300"}}>{this.state.selectedUser.firstName}</h4>
                                    <br/>
                                    <h4 class="modal-title">Last Name</h4>
                                    <h4 style = {{fontWeight : "300"}}>{this.state.selectedUser.lastName}</h4>
                                    <br/>
                                    <h4 class="modal-title">User Display Name</h4>
                                    <h4 style = {{fontWeight : "300"}}>{this.state.selectedUser.displayName}</h4>
                                    <br/>
                                    <h4 class="modal-title">Email</h4>
                                    <h4 style = {{fontWeight : "300"}}>{this.state.selectedUser.email}</h4>
                                    <br/>
                                    <h4 class="modal-title">Is User Subscribed : {this.state.selectedUser.subscribed ? "Yes" : "No"}</h4>
                                    <br/>
                                </div>:null}
                                <div class="modal-footer">
                                    <input id="modelCloseBtn" onClick={this.handleRedirect} type="button" class="btn btn-default" data-dismiss="modal" value="Cancel"/>
                                </div>
                                {/* <div class="modal-footer">
                                    <Link to = {`/admin/delete/`} data-dismiss="modal" class="btn btn-success" value="Cancel"></Link>
                                </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}



export default UserActivity;