import React,{Component} from 'react';
import movieImg from '../image.webp';
import movieMeta from '../movie-meta.webp';
import videoSrc from '../sabrina-crop.mp4';
import TopTen from './TopTen';
import Navbar from './/Navbar';
import axios from 'axios';
import {api} from '../store/actions';

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
                <h1 style = {{color : "white"}}>Top Ten Movies of the Week</h1>
                <div class="img-container"> {top}</div>
               
                <h1 style = {{color : "white"}}>Trending now</h1>
                <div class="img-container">{trending}</div>
            </div>
        )
    }
}

export default Home;