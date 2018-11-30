import React,{Component} from 'react';
import Navbar from '../component/Navbar';

class movieDetails extends Component{
    render(){
        return(
            <div >
                <Navbar/>
                <div style = {{color : "white", margin:"5%"}} class="row">
                    <div class="col-sm-3" >
                        <h1>Movie Image Goes Here</h1>
                    </div>
                    <div class="col-sm-6" >
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="col-sm-3" >
                        <button style={{alignSelf:"center"}} type="button" class="btn btn-primary">
                            Add a Review
                        </button>
                        <h1>Movie Reviews Goes Here</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default movieDetails;