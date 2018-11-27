import React,{Component} from 'react';
import movieImg from '../img1.jpg';


class TopTen extends Component{
    render(){
        return(
            <div class="card" style = {{display : "inline-block", position : "relative", margin : "0 2px"}}>
                <img class="card-img-top" src={movieImg} alt="Card image cap"/>
                
            </div>
        )
    }
}

export default TopTen;