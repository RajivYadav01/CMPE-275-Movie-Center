import React,{Component} from 'react';
import movieImg from '../image.webp';
import movieMeta from '../movie-meta.webp';
import videoSrc from '../sabrina-crop.mp4';
import TopTen from './TopTen';
import SignUp from './SignUp';
import Navbar from './/Navbar';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            topTen : [
              {
                "title": "deadpool-1",
                "genre": "action",
                "studio_name": "Universal Studios",
                "synopsis":"Marvel's action movie",
                "image_url": "ksdbckabcab",
                "youtube_url": "kbcisdbidbs",
                "actorsList": [
                        {"name":"Venkatesh"},
                      {"name":"Warner"}
                    ],
                "actressList": [
                      {"name":"alexia"},
                      {"name":"julia"},
                      {"name": "sandra"}
                    ],
                "director":"Rajiv",
                "country": "United States of America",
                "mpaa_rating": "G",
                "availability_type": "Free",
                "price": 10.00
                
              },
              {
                "title": "deadpool - 2",
                "genre": "action",
                "studio_name": "Universal Studios",
                "synopsis":"Marvel's action movie",
                "image_url": "ksdbckabcab",
                "youtube_url": "kbcisdbidbs",
                "actorsList": [
                        {"name":"Venkatesh"},
                      {"name":"Warner"}
                    ],
                "actressList": [
                      {"name":"alexia"},
                      {"name":"julia"},
                      {"name": "sandra"}
                    ],
                "director":"Rajiv",
                "country": "United States of America",
                "mpaa_rating": "G",
                "availability_type": "Free",
                "price": 10.00
                
              },
              {
                "title": "deadpool - 3",
                "genre": "action",
                "studio_name": "Universal Studios",
                "synopsis":"Marvel's action movie",
                "image_url": "ksdbckabcab",
                "youtube_url": "kbcisdbidbs",
                "actorsList": [
                        {"name":"Venkatesh"},
                      {"name":"Warner"}
                    ],
                "actressList": [
                      {"name":"alexia"},
                      {"name":"julia"},
                      {"name": "sandra"}
                    ],
                "director":"Rajiv",
                "country": "United States of America",
                "mpaa_rating": "G",
                "availability_type": "Free",
                "price": 10.00
                
              },
              {
                "title": "deadpool - 4",
                "genre": "action",
                "studio_name": "Universal Studios",
                "synopsis":"Marvel's action movie",
                "image_url": "ksdbckabcab",
                "youtube_url": "kbcisdbidbs",
                "actorsList": [
                        {"name":"Venkatesh"},
                      {"name":"Warner"}
                    ],
                "actressList": [
                      {"name":"alexia"},
                      {"name":"julia"},
                      {"name": "sandra"}
                    ],
                "director":"Rajiv",
                "country": "United States of America",
                "mpaa_rating": "G",
                "availability_type": "Free",
                "price": 10.00
                
              }
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
        let top = this.state.topTen.map(movie => {
            // console.log("Movie Title : ", movie.title);
            return(
              <TopTen title = {movie.title}/>
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
                {top}
            </div>
        )
    }
}

export default Home;