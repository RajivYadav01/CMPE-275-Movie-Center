import React,{Component} from 'react';
import Navbar from '../component/Navbar';
import {connect} from 'react-redux';
import {CreateMovie} from '../store/actions';
import {UpdateMovie} from '../store/actions';
import {Link} from 'react-router-dom';
import '../App.css';
import axios from 'axios';

import {api} from '../store/actions';

class AddMovie extends Component{
    constructor(props){
        super(props);

        this.state = {
            title: '',
            genre: '',
            studioName: '',
            synopsis:'',
            imageUrl: '',
            youtubeUrl: '',
            actors: '',
            actresses: '',
            director:'',
            country: '',
            mpaaRating: '',
            availabilityType: '',
            price: 0.00,
            currentTab : 0,
        }
    }

    handleChange = (events) => {
        this.setState({
            [events.target.name]: events.target.value
        })   
    }
    handleSubmit = (e, formTitle) => {
        e.preventDefault();
        console.log("Inside Submit");
        var newMovieDetails = {
            title: this.state.title,
            genre: this.state.genre,
            studioName: this.state.studioName,
            synopsis:this.state.title.synopsis,
            imageUrl: this.state.imageUrl,
            youtubeUrl: this.state.youtubeUrl,
            actors: this.state.actors,
            actresses: this.state.actresses,
            director:this.state.director,
            country: this.state.country,
            mpaaRating: this.state.mpaaRating,
            availabilityType: this.state.availabilityType,
            price: this.state.price
        }
        console.log("New Movie Deatils : ", newMovieDetails);
        if(this.props.match.params.movieID != -1){
            console.log("Movie ID : ", this.props.match.params.movieID);
            this.props.onUpdateClicked(newMovieDetails,this.props.match.params.movieID);
        }else{
            this.props.onSubmitClicked(newMovieDetails);
        }
        
    }

    handlePrev = (e) => {
        e.preventDefault();
        this.setState({
            currentTab : (this.state.currentTab - 1)
        })
    }

    handleNext = (e) => {
        e.preventDefault();
        this.setState({
            currentTab : (this.state.currentTab + 1)
        })
    }
    componentWillMount(){
        var movieID = this.props.match.params.movieID;
        console.log("Movie ID : ", movieID);
        axios.get(`${api}/movies/${movieID}`,{
            headers: {"Authorization" : localStorage.getItem("Authorization")}})
            .then((response) => {
                console.log("Response : ", response);
                this.setState({
                    title : response.data.title,
                    genre : response.data.genre,
                    studioName : response.data.studioName,
                    synopsis : response.data.synopsis,
                    imageUrl : response.data.imageUrl,
                    youtubeUrl : response.data.youtubeUrl,
                    actors : response.data.actors,
                    actresses : response.data.actresses,
                    director : response.data.director,
                    country : response.data.country,
                    mpaaRating : response.data.mpaaRating,
                    availabilityType : response.data.availabilityType,
                    price : response.data.price
                })
        })
    }
    render(){
        console.log("State : ", this.state);
        let FormTitle = "Add";
        if(this.props.match.params.movieID != -1){
            FormTitle = "Edit";
        }
        const styleForm = {
            boxSizing: "border-box",
            backgroundColor: "#ffffff",
            margin: "100px auto",
            fontFamily: "Raleway",
            padding: "40px",
            width: "70%",
            minWidth: "300px"
        }

        const styleInput = {
            padding: "10px",
            width: "100%",
            fontSize: "17px",
            fontFamily: "Raleway",
            border: "1px solid #aaaaaa",
            color : "red"
        }

        const styleButton1 = {
            backgroundColor: "#4CAF50",
            color: "#ffffff",
            border: "none",
            padding: "10px 20px",
            fontSize: "17px",
            fontFamily: "Raleway",
            cursor: "pointer",
            marginLeft : "5px",
            display : "none"
        }

        const styleButton2 = {
            backgroundColor: "#4CAF50",
            color: "#ffffff",
            border: "none",
            padding: "10px 20px",
            fontSize: "17px",
            fontFamily: "Raleway",
            cursor: "pointer",
            marginLeft : "5px",
            display : "inline"
        }

        const stepStyle = {
            height: "15px",
            width: "15px",
            margin: "0 2px",
            backgroundColor: "#bbbbbb",
            border: "none",  
            borderRadius: "50%",
            display: "inline-block",
            opacity: "0.5"
        }
        let PrevButton = null;
            if(this.state.currentTab == 0){
                PrevButton = (
                    <button className=" signUpBtn btn btn-primary form-control" type="button" id="prevBtn" onClick={(e) => this.handlePrev(e,FormTitle)}>Previous</button>
                )
                        
            }else{
                PrevButton = (
                    <button className=" signUpBtn btn btn-primary form-control"  type="button" id="prevBtn" onClick={(e) => this.handlePrev(e,FormTitle)}>Previous</button>
                )
            }
        let nextButton = null;
        if(this.state.currentTab == 3){
            nextButton = (
                <button className=" signUpBtn btn btn-primary form-control" type="button" id="prevBtn" onClick={(e) => this.handleSubmit(e,FormTitle)}>Submit</button>
            )
                    
        }else{
            nextButton = (
                <button className=" signUpBtn btn btn-primary form-control" type="button" id="prevBtn" onClick={(e) => this.handleNext(e,FormTitle)}>Next</button>
            )
        }
        return(
            <div>
                <Navbar/>
                <div class="bg-wrapper" style={{opacity : "0.25"}}> 
                    <img class="bg-img " src="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt="" />
                </div>
                <br/>
                <div className = "main-center" style={{width : "40%"}}>
                    <form  className="sign-in-form">
                        <h1 className = "h4Label" >{FormTitle} a Movie:</h1>
                        
                        <div style={{display: this.state.currentTab === 0 ? 'block' : 'none', fontSize : "16pt" }}>
                            <p><input className="inputField form-control" onChange = {this.handleChange}  placeholder="Movie Title" name="title" value={this.state.title}/></p>
                            <p><input className="inputField form-control" onChange = {this.handleChange}  placeholder="Movie Genre"  name="genre" value={this.state.genre}/></p>
                            <p><input className="inputField form-control" onChange = {this.handleChange}  placeholder="Studio Name" name="studioName" value={this.state.studioName}/></p>
                        </div>
                        <div style={{display: this.state.currentTab === 1 ? 'block' : 'none', fontSize : "16pt" }}>
                            <p><input className="inputField form-control" onChange = {this.handleChange}  placeholder="Synopsis"  name="synopsis" value={this.state.synopsis} /></p>
                            <p><input className="inputField form-control" onChange = {this.handleChange}  placeholder="Image URL"  name="imageUrl" value={this.state.imageUrl}/></p>
                            <p><input className="inputField form-control" onChange = {this.handleChange}  placeholder="Youtube URL"  name="youtubeUrl" value={this.state.youtubeUrl} /></p>
                        </div>
                        <div style={{display: this.state.currentTab === 2 ? 'block' : 'none',fontSize : "16pt"  }}>
                            <p><input className="inputField form-control" onChange = {this.handleChange}  placeholder="Actor"  name="actors" value={this.state.actors}/></p>
                            <p><input className="inputField form-control" onChange = {this.handleChange}  placeholder="Actresses"  name="actresses" value={this.state.actresses}/></p>
                            <p><input className="inputField form-control" onChange = {this.handleChange} placeholder="Director"  name="director"value={this.state.director} /></p>
                        </div>
                        <div style={{display: this.state.currentTab === 3 ? 'block' : 'none', fontSize : "16pt" }}>
                            <p><input className="inputField form-control" onChange = {this.handleChange}  placeholder="Country"  name="country"value={this.state.country}/></p>
                            <p><input className="inputField form-control" onChange = {this.handleChange}  placeholder="MPAA Rating"  name="mpaaRating" type="text" value={this.state.mpaaRating} /></p>
                            <p><input className="inputField form-control" onChange = {this.handleChange}  placeholder="Availability Type"  name="availabilityType" type="text" value={this.state.availabilityType}/></p>
                            <p><input className="inputField form-control" onChange = {this.handleChange}  placeholder="Price"  name="price" type="text"/></p>
                        </div>
                        <div style={{overflow:"auto"}}>
                            <div style={{float:"left"}}>
                            {PrevButton}
                            </div>
                            <div style={{float : "right"}}>
                            {nextButton}
                            </div>
                        </div>
                        <div style={{textAlign:"center",marginTop:"40px"}}>
                            <span style = {stepStyle}></span>
                            <span style = {stepStyle}></span>
                            <span style = {stepStyle}></span>
                            <span style = {stepStyle}></span>
                        </div>
                    </form>
                </div>
                </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    console.log("Inside map dipatch to props");
    return{
        onSubmitClicked : (details) => dispatch(CreateMovie(details)),
        onUpdateClicked : (details,movieID) => dispatch(UpdateMovie(details,movieID)),
    }
}

export default connect(null,mapDispatchToProps)(AddMovie);