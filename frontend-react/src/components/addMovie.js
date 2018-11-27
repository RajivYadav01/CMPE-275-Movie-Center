import React,{Component} from 'react';
import Navbar from '../component/Navbar';

class AddMovie extends Component{
    render(){
        const styleForUL = {
            listStyleType: "none",
            margin: "0",
            padding: "0",
            overflow: "hidden",
            backgroundColor : "white"
        }
        const styleForLi = {
            float : "left"
        }
        const styleForLiA = {
            display: "block",
            color: "black",
            textAlign: "center",
            padding: "14px 16px",
            textDecoration: "none"
        }
        return(
            <div>
                <Navbar/>
                <br/>
                <ul style={styleForUL}>
                    <li  className="active" style={styleForLi}><a href="/" style = {styleForLiA}>Add a Movie</a></li>
                    <li style={styleForLi}><a href="/" style = {styleForLiA}>Delete a Movie</a></li>
                    <li style={styleForLi}><a href="/" style = {styleForLiA}>Edit a Movie</a></li>
                </ul>
                <br/><br/>
                <div style={{color : "white", width:"50%", alignContent : "center", marginLeft:"25%"}}>
                    <h1>Add a New Movie</h1>
                </div>
                <br/>
                <form style={{color : "white", width:"50%", alignContent : "center", marginLeft:"25%"}}>
                    <div class="form-group">
                        <label for="exampleInputTitle">Movie Title</label>
                        <input type="text" class="form-control" id="exampleInputTitle" aria-describedby="emailHelp" placeholder="Enter Movie Title"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputGenre">Genre</label>
                        <input type="text" class="form-control" id="exampleInputGenre" aria-describedby="emailHelp" placeholder="Enter Movie Title"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputRelease">Year of Release</label>
                        <input type="text" class="form-control" id="exampleInputRelease" aria-describedby="emailHelp" placeholder="Enter Movie Title"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputStudio">Studio Name</label>
                        <input type="text" class="form-control" id="exampleInputStudio" aria-describedby="emailHelp" placeholder="Enter Movie Title"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputImageURL">Movie Image URL</label>
                        <input type="text" class="form-control" id="exampleInputImageURL" aria-describedby="emailHelp" placeholder="Enter Movie Title"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputYouTubeURL">Movie Youtube URL</label>
                        <input type="text" class="form-control" id="exampleInputYouTubeURL" aria-describedby="emailHelp" placeholder="Enter Movie Title"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputCountry">Country</label>
                        <input type="text" class="form-control" id="exampleInputCountry" aria-describedby="emailHelp" placeholder="Enter Movie Title"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputRating">Rating</label>
                        <input type="text" class="form-control" id="exampleInputRating" aria-describedby="emailHelp" placeholder="Enter Movie Title"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputAvailability">Availability Type</label>
                        <input type="text" class="form-control" id="exampleInputAvailability" aria-describedby="emailHelp" placeholder="Enter Movie Title"/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPrice">Price</label>
                        <input type="text" class="form-control" id="exampleInputPrice" aria-describedby="emailHelp" placeholder="Enter Movie Title"/>
                    </div>
                </form>
            </div>
        )
    }
}
export default AddMovie;