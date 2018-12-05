import React,{Component} from 'react';
import axios from 'axios';
import {api} from '../store/actions';
import {Link} from "react-router-dom";
import PieChart from 'react-minimal-pie-chart';
import Navbar from '../component/Navbar';


class MovieActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            message: '',
            toptenmovies:[],
            last24hours: 0,
            lastweek: 0,
            lastmonth: 0,
            datatoshowinPieChart: []
        }
        this.handleMoviePlayClick = this.handleMoviePlayClick.bind(this);
        this.handlePeriodClick = this.handlePeriodClick.bind(this);
    }

    componentWillMount() {
        axios.get(`${api}/movies/`, {
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
                    movies: response.data,
                    message: ''
                })
            }
        })
    }

    

    handleMoviePlayClick = (e, movie) => {
        let last24hours = 0;
        let lastweek= 0;
        let lastmonth = 0;
        console.log("Movie: ", movie);
        
        var last24hoursPrmoise = new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.get(`${api}/admin/movies/${movie.movieId}/numberofplays?period=last24hours`, {
                    headers: {"Authorization" : localStorage.getItem("Authorization")}
                })
                .then((response)=>{
                    console.log("lastmonth in promise p1",response.data);
                    resolve(response.data.data);
                })
              
            }, 100);
          });
        
        var lastweekPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            axios.get(`${api}/admin/movies/${movie.movieId}/numberofplays?period=lastweek`, {
                headers: {"Authorization" : localStorage.getItem("Authorization")}
            })
            .then((response)=>{
                console.log("lastmonth in promise p1",response.data);
                resolve(response.data.data);
            })
            
        }, 100);
        });

        var lastmonthPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                axios.get(`${api}/admin/movies/${movie.movieId}/numberofplays?period=lastmonth`, {
                    headers: {"Authorization" : localStorage.getItem("Authorization")}
                })
                .then((response)=>{
                    console.log("lastmonth in promise p3",response.data);
                    lastmonth = response.data.data;
                    resolve(lastmonth);
                })
              
            }, 100);
          });

        Promise.all([last24hoursPrmoise, lastweekPromise, lastmonthPromise]).then(values => { 

            var datatoshowinPieChart = [
                { title: 'last24hours', value: values[0], color: '#E38627' },
                { title: 'lastweek', value: values[1], color: '#C13C37' },
                { title: 'lastmonth', value: values[2], color: '#6A2135' },
              ]
            console.log("After resolving all the promises:",values); 
            this.setState({
                last24hours: values[0],
                lastweek: values[1],
                lastmonth: values[2],
                datatoshowinPieChart: datatoshowinPieChart
            }, ()=>{
                console.log(this.state.datatoshowinPieChart);
            })
        });
        
    }

    handlePeriodClick = (period) => {
        console.log(period);
        console.log("Printing in TopTenMoviesByPeriod:",period);
        axios.get(`${api}/admin/toptenmoviebyplays?period=${period}`, {
            headers: {"Authorization" : localStorage.getItem("Authorization")}
        })
        .then((response)=>{
            console.log("Printing in TopTenMoviesByPeriod:",response.data);
            if(response.data.length == 0) {
                console.log("Show message");
                this.setState({
                    message: 'No statistics available',
                    toptenmovies: []
                })    
            } else {
                this.setState({
                    toptenmovies: response.data,
                    message: ''
                })
            }

        })
    }

    render() {

        let movieDetails = null;
        if(this.state.movies.length != 0) {
            movieDetails = this.state.movies.map((m,index) => {
                return(
                    <tr key={m.movieId} >
                        <td><Link to= {`/movieDetails/${m.movieId}`}>{m.title}</Link></td>
                        <td>{m.actors}</td>
                        <td>{m.director}</td>
                        <td>{m.genre}</td>
                        <td>{m.mpaaRating}</td>
                        <td>{m.yearOfRelease}</td>
                        <td>{m.average_rating}</td>
                        <td>
                            <button 
                                type="button" 
                                className="btn btn-primary"
                                onClick={(e) => this.handleMoviePlayClick(e, m)}
                                data-toggle="modal" data-target="#exampleModal">movie plays
                            </button>
                            
                            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Movie Statistics</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        {/* <p>{this.state.lastmonth}</p> */}
                                        <p>last24hours: {this.state.last24hours}</p>
                                        <p>lastweek: {this.state.lastweek}</p>
                                        <p>lastmonth: {this.state.lastmonth}</p>
                                        <PieChart data={this.state.datatoshowinPieChart} />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    </div>
                                    </div>
                                </div>
                            </div>


                        </td>
                    </tr>
                )
            });
        }

        let topTenMoviesByPeriod = null;
        if(this.state.toptenmovies.length != 0) {
            topTenMoviesByPeriod = this.state.toptenmovies.map((m,index) => {
                return(
                    <tr key={m.movieId} >
                        <td><Link to= {`/movieDetails/${m.movieId}`}>{m.title}</Link></td>
                        <td>{m.actors}</td>
                        <td>{m.director}</td>
                        <td>{m.genre}</td>
                        <td>{m.mpaaRating}</td>
                        <td>{m.yearOfRelease}</td>
                        <td>{m.average_rating}</td>
                        {/* <td>
                            <button 
                                type="button" 
                                className="btn btn-primary"
                                onClick={(e) => this.handleMoviePlayClick(e, m)}>movie plays
                            </button>
                        </td> */}
                    </tr>
                )
            });
        }

        return (
            <div className='MovieActivity'>
                <Navbar/>
                <div class="bg-wrapper" style={{opacity : "0.25"}}> 
                    <img class="bg-img " src="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt="" />
                </div>
                <br/>
                <br/>
                <div class="table-title" style={{marginLeft:'12%', marginRight:'12%'}}>
                    <div class="row">
                        <div class="col-sm-6">
                            <h2>Movie Activity</h2>
                        </div>
                    </div>
                </div>
                <hr />
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
                                    <th>No. of Plays</th>
                                </tr>
                            </thead>
                            <tbody>
                                {movieDetails}
                            </tbody>
                        </table>
                    </div>
                    {/* <div>
                        <p style={{color: 'white', font: '20px'}}>{ this.state.message }</p>
                    </div> */}
                </div>

                <br />
                <br />

                 <div class="table-title" style={{marginLeft:'12%', marginRight:'12%'}}>
                    <div class="row">
                        <div class="col-sm-6">
                            <h2>Select period to view top ten movies</h2>
                        </div>
                    </div>
                </div>
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
                            {topTenMoviesByPeriod}
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

export default MovieActivity;