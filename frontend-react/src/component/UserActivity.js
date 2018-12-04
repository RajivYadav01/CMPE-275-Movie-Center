import React,{Component} from 'react';
import axios from 'axios';
import {api} from '../store/actions';
import '../css/useractivity.css';
// import {Link} from "react-router-dom";

class UserActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            moviePlayingHistory: [],
            periodToShow: "",
            toptenusers: [],
            message: ''
        }
        this.handleMoviePlayHistoryClick = this.handleMoviePlayHistoryClick.bind(this);
        this.handlePeriodClick = this.handlePeriodClick.bind(this);
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
                    message: 'No statistics available'
                })    
            } else {
                this.setState({
                    toptenusers: response.data,
                    message: ''
                })
            }

        })
    }

    render() {

        let userDetails = null;
        if(this.state.users.length != 0) {
            userDetails = this.state.users.map((user)=>{
                return (
                    <tr key={user.userId}>
                        <td>{user.firstName}</td>
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
                        <td>{user.firstName}</td>
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
                <h1>Hello World</h1>
                <hr/>
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
                </div>

                <br />
                <br />

                <h1>Select period to view top ten users...</h1>
                <hr />

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

            </div>
        )
    }


}



export default UserActivity;