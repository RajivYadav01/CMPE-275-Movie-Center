import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import TopTen from './TopTen';

class Recommended extends Component{
    render(){
        let moviesList = this.props.movies.map(movie => {
            console.log("Movie Title : ", movie.title);
            return(
                <div class="img-card" style = {{display : "inline-block", position : "relative", margin : "0 2px"}}>
                    <Link to= {`/movieDetails/${movie.movieId}`}><img class="card-img-top" src={movie.imageUrl} alt="Card image cap"/></Link> 
                </div>
            )
        })
        return(
           <span>{moviesList}</span> 
        );
    }
}

export default Recommended;