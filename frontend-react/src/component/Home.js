import React,{Component} from 'react';
import movieImg from '../image.webp';
import movieMeta from '../movie-meta.webp';
import videoSrc from '../sabrina-crop.mp4';
import TopTen from './TopTen';
import Navbar from './/Navbar';
import axios from 'axios';
import {api} from '../store/actions';
import {Link} from 'react-router-dom';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            topMovies : [
                // {
                //     "title" : "Title 1",
                //     "genre" : "Comedy"
                // },
                // {
                //     "title" : "Title 2",
                //     "genre" : "Comedy"
                // }
                
            ],
            trendingNow : [

            ]
        }
    }
    handleLoad = (e) => {
        
        document.getElementById('imgTag').style.display='none';
        document.getElementById('videoTag').style.display = 'block';
      
    }

    handleMouseLeave = (e) => {
        document.getElementById('imgTag').style.display='block';
        document.getElementById('videoTag').style.display = 'none'
    }

    componentWillMount(){
        
        axios({
            method:'get',
            url: `${api}/reviews/toptenmoviebyratings?period=lastmonth`,
            headers: {'Accept': 'application/json', 'Authorization' :localStorage.getItem('Authorization')}
        })
        .then((response) => {
            console.log(response.data);
            this.setState({
                topMovies : this.state.topMovies.concat(response.data)
            })
        })

        axios({
            method:'get',
            url: `${api}/movies/`,
            headers: {'Accept': 'application/json', 'Authorization' :localStorage.getItem('Authorization')}
        })
        .then((response) => {
            console.log(response.data);
            this.setState({
                trendingNow : this.state.trendingNow.concat(response.data)
            })
        })
    }
    render(){
        const videoContainer = {
            position: "relative",
        }
        const textStyle1 = {
            background: "rgba(0,0,0,0)",
            position: "absolute",
            top: "200px",
            display: "flex",
            color : "white",
            whiteSpace: "wrap",
            marginLeft : "5%"
        }

        const videoStyle = {
            width : "100%",
            height : "80%",
            display : "none"
        }
        let top = this.state.topMovies.map(movie => {
            console.log("Movie Title : ", movie.title);
            return(
              <TopTen title = {movie.title} imageUrl = {movie.imageUrl} movieId = {movie.movieId}/>
            )
        })
        let trending = this.state.trendingNow.map(movie => {
            console.log("Movie Title : ", movie.title);
            return(
              <TopTen title = {movie.title} imageUrl = {movie.imageUrl} movieId = {movie.movieId}/>
            )
        })

        let movieDetails = null;
        movieDetails = this.state.trendingNow.map((m,index) => {
            return(
                <tr>
                    <td><Link to= {`/movieDetails/${m.movieId}`}>{m.title}</Link></td>
                    <td>{m.actors}</td>
                    <td>{m.actresses}</td>
                    <td>{m.director}</td>
                    <td>{m.price}</td>
                    <td>
                        <Link to= {`/admin/create/${m.movieId}`} class="edit"><i className="material-icons"><span class="glyphicon glyphicon-pencil"></span></i></Link>
                        <a onClick={(e) => this.handleMovieToDelete(e,m.movieId)} href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete"><span class="glyphicon glyphicon-trash"></span></i></a>
                    </td>
                </tr>
            )
        })

        return(
            <div>
                <Navbar/>
                <div style={videoContainer}>
                    <div onMouseEnter={this.handleLoad} onMouseLeave = {this.handleMouseLeave}>
                        <img id="imgTag" style={{objectFit: "contain"}} class="hero static-image image-layer" src={movieImg} alt=""/>
                        <video id = "videoTag" style={videoStyle} controls={true} autoPlay ={true}>
                            <source src={videoSrc} type="video/mp4"/>
                        </video>
                    </div>
                    <div style={textStyle1} class="info meta-layer">
                        <div class="trailer-vignette vignette-layer"> 
                        </div>
                        <div class="logo-and-text meta-layer">
                            <div class="billboard-title">
                                <img class="title-logo" src={movieMeta} title="Sabrina" alt="Sabrina"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-img-content"><h1 style = {{color : "white"}}>Top Ten Movies of the Month</h1>
                 <div class="img-container"> {top}</div></div>
             
                 {/* <div><h1 style = {{color : "white"}}>Trending Now</h1></div><br/>
                 <div className="table-responsive" style = {{backgroundColor : "white"}}>
                    <br/>
                    <table id="myTable"  class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Movie Title</th>
                                <th>Actors</th>
                                <th>Actresses</th>
                                <th>Director</th>
                                <th>Year of Release</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movieDetails}
                        </tbody>
                    </table>
                   
                </div> */}
                
            </div>
        )
    }
}

export default Home;