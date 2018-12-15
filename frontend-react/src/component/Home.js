import React,{Component} from 'react';
import movieImg from '../image.webp';
import movieMeta from '../movie-meta.webp';
import videoSrc from '../sabrina-crop.mp4';
import TopTen from './TopTen';
import Recommended from './Recommended';
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
            recommeded : []
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

    getRecommededTitle(type, displayName){
        if(type == 'genre'){
            return(
                <span>Because you watched {displayName}</span>
            )
        } else if(type == 'director'){
            return(
                <span>Because you watched movies directed by {displayName}</span>
            )
        }
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
        var recommededList = [];
        var filterList = {
            'genre': [],
            'director' : []
        }

        axios({
            method:'get',
            url: `${api}/users/useractivity/`+localStorage.getItem('userId'),
            headers: {'Accept': 'application/json', 'Authorization' :localStorage.getItem('Authorization')}
        })
        .then((response) => {
            console.log(response);
            if(response.status = 200 && response.data.length != 0){
               var searchString = ''
               for(var i in response.data){

                console.log(response.data[i])
                var movie  = response.data[i];
                    if(movie.genre && filterList['genre'].indexOf(movie.genre) == -1 && filterList['genre'].length < 3){
                        var obj = new Object();
                        obj.display_name = movie.title;
                        obj.movie_title = movie.title;
                        obj.search_type = 'genre';
                        obj.search_string = movie.genre;
                        obj.movies = [];
                        filterList['genre'].push(movie.genre);
                        searchString = searchString.concat(movie.genre + " ");
                        recommededList.push(obj);
                    }
                    if(movie.director && filterList['genre'].indexOf(movie.director) == -1 && filterList['director'].length < 3){
                        var obj = new Object();
                        obj.display_name = movie.director;
                        obj.search_type = 'director';
                        obj.movie_title = movie.title;
                        obj.search_string = movie.director;
                        obj.movies = [];
                        filterList['director'].push(movie.director);
                        searchString = searchString.concat(movie.director + " ");
                        recommededList.push(obj);
                    }  
               }
               console.log(searchString);
               axios({
                    method:'get',
                    url: `${api}/movies/search/`+searchString,
                    headers: {'Accept': 'application/json', 'Authorization' :localStorage.getItem('Authorization')}
                })
                .then((response1) => {
                    console.log(response1.data);
                    for(var i in response1.data){
                        var movie = response1.data[i];
                            for(var j in recommededList){
                                if(recommededList[j]['search_type'] == 'genre'){
                                   if(movie.genre.includes(recommededList[j]['search_string']) && recommededList[j]['movie_title'] != movie.title){
                                    recommededList[j]['movies'].push(movie);
                                   }
                                }
                                if(recommededList[j]['search_type'] == 'director'){
                                    if(movie.director.includes(recommededList[j]['search_string']) && recommededList[j]['movie_title'] != movie.title){
                                     recommededList[j]['movies'].push(movie);
                                    }
                                 }
                            }
                    }
                    console.log(recommededList);
                    this.setState({
                        recommeded : recommededList
                    });
                });
    
            }
        });
    }
    render(){
        //let recommededMovies = null
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

        let recommededMovies = this.state.recommeded.map(item =>{
            if(item.movies.length != 0){
                console.log(item.movies)
                return(
                <div class="main-img-content">
                    <h1 style = {{color : "white"}}>{this.getRecommededTitle(item.search_type, item.display_name)}</h1>
                    <div class="img-container">
                    <Recommended movies = {item.movies} />
                    </div>
                </div>
                )
            }
            
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
                <div class="main-img-content">
                    <h1 style = {{color : "white"}}>Top Ten Movies of the Month</h1>
                    <div class="img-container">
                         {top}
                    </div>
                </div>
               {recommededMovies}
            </div>
        )
    }
}

export default Home;