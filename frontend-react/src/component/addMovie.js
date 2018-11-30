import React,{Component} from 'react';
import Navbar from '../component/Navbar';
import {connect} from 'react-redux';
import {CreateMovie} from '../store/actions';
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
            studioName: this.state.studio_name,
            synopsis:this.state.title.synopsis,
            imageUrl: this.state.image_url,
            youtubeUrl: this.state.youtube_url,
            actors: this.state.actors,
            actresses: this.state.actresses,
            director:this.state.director,
            country: this.state.country,
            mpaaRating: this.state.mpaa_rating,
            availabilityType: this.state.availability_type,
            price: this.state.price
        }
        console.log("New Movie Deatils : ", newMovieDetails);
        this.props.onSubmitClicked(newMovieDetails);
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
        axios.get(`${api}/movies/${movieID}`)
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
                    <button style={styleButton1} type="button" id="prevBtn" onClick={(e) => this.handlePrev(e,FormTitle)}>Previous</button>
                )
                        
            }else{
                PrevButton = (
                    <button style={styleButton2} type="button" id="prevBtn" onClick={(e) => this.handlePrev(e,FormTitle)}>Previous</button>
                )
            }
        let nextButton = null;
        if(this.state.currentTab == 3){
            nextButton = (
                <button style={styleButton2} type="button" id="prevBtn" onClick={(e) => this.handlePrev(e,FormTitle)}>Submit</button>
            )
                    
        }else{
            nextButton = (
                <button style={styleButton2} type="button" id="prevBtn" onClick={(e) => this.handlePrev(e,FormTitle)}>Next</button>
            )
        }
        return(
            <div>
                <Navbar/>
                <br/>
                    <form style={styleForm}>
                        <h1 style={{textAlign : "center"}}>{FormTitle} a Movie:</h1>
                        
                        <div style={{display: this.state.currentTab === 0 ? 'block' : 'none', fontSize : "14pt" }}>Basic Movie Details:
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Movie Title" name="title" value={this.state.title}/></p>
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Movie Genre"  name="genre" value={this.state.genre}/></p>
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Studio Name" name="studioName" value={this.state.studioName}/></p>
                        </div>
                        <div style={{display: this.state.currentTab === 1 ? 'block' : 'none' }}>Basic Movie Details:
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Synopsis"  name="synopsis" value={this.state.synopsis} /></p>
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Image URL"  name="imageUrl" value={this.state.imageUrl}/></p>
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Youtube URL"  name="youtubeUrl" value={this.state.youtubeUrl} /></p>
                        </div>
                        <div style={{display: this.state.currentTab === 2 ? 'block' : 'none' }}>Basic Movie Details:
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Actor"  name="actors" value={this.state.actors}/></p>
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Actresses"  name="actresses" value={this.state.actresses}/></p>
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Director"  name="director"value={this.state.director} /></p>
                        </div>
                        <div style={{display: this.state.currentTab === 3 ? 'block' : 'none' }}>Basic Movie Details:
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Country"  name="country"value={this.state.country}/></p>
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="MPAA Rating"  name="mpaaRating" type="text" value={this.state.mpaaRating} /></p>
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Availability Type"  name="availabilityType" type="text" value={this.state.availabilityType}/></p>
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Price"  name="price" type="text"/></p>
                        </div>
                        <div style={{overflow:"auto"}}>
                            <div style={{float:"right"}}>
                            {PrevButton}
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
        )
    }
}

const mapDispatchToProps = dispatch => {
    console.log("Inside map dipatch to props");
    return{
        onSubmitClicked : (details) => dispatch(CreateMovie(details)),
    }
}

export default connect(null,mapDispatchToProps)(AddMovie);