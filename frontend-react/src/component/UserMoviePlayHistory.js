import React,{Component} from 'react';
import axios from 'axios';
import {api} from '../store/actions';
import '../css/usermovieplayhistory.css';
import {Link} from "react-router-dom";

class UserMoviePlayHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviePlayingHistory: [],
            message: ""
        }
    }

    componentWillMount() {
        const userid = this.props.match.params.userid;
        console.log("User id in UserMoviePlayHistory:", userid);
        axios.get(`${api}/admin/users/${userid}/history`,{
            headers: {"Authorization" : localStorage.getItem("Authorization")}
        }).then((response)=>{
            console.log("Received response of movie playing history for user:", response.data);
            if(response.data!=null && response.data.length != 0) {
                this.setState({
                    moviePlayingHistory: response.data,
                    message: ""
                })
            } else {
                this.setState({
                    message: "No movie playing history found...I guess user is busy with CMPE275 project"
                })
            }
        })
    }

    render() {

        let movieDetails = null;
        if(this.state.moviePlayingHistory.length != 0) {
            movieDetails = this.state.moviePlayingHistory.map((m,index) => {
                return(
                    <tr key={m.movieId} >
                        <td><Link to= {`/movieDetails/${m.movieId}`}>{m.title}</Link></td>
                        <td>{m.actors}</td>
                        <td>{m.director}</td>
                        <td>{m.genre}</td>
                        <td>{m.mpaaRating}</td>
                        <td>{m.yearOfRelease}</td>
                        <td>{m.average_rating}</td>
                    </tr>
                )
            });
        }

        return (
            <div className='UserMoviePlayHistory'>
                <h1 style={{color: 'white'}}>User movie play history</h1>
                <hr/>
                <div style={{marginLeft:'12%', marginRight:'12%'}}>
                    <div className="table-responsive" style={{backgroundColor: "white"}}>
                        <table id="myTable" className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Movie Title</th>
                                    <th>Actors</th>
                                    <th>Director</th>
                                    <th>Genre</th>
                                    <th>MPAA Rating</th>
                                    <th>Year of Release</th>
                                    <th>Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movieDetails}
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

export default UserMoviePlayHistory;