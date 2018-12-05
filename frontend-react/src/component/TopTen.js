import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class TopTen extends Component{
    render(){
        return(
            
            <div class="img-card" style = {{display : "inline-block", position : "relative", margin : "0 2px"}}>
               <Link to= {`/movieDetails/${this.props.movieId}`}><img class="card-img-top" src={this.props.imageUrl} alt="Card image cap"/></Link> 
            </div>

        )
    }
}

export default TopTen;