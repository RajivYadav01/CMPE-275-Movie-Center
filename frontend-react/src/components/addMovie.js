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
            studio_name: '',
            synopsis:'',
            image_url: '',
            youtube_url: '',
            actors: '',
            actresses: '',
            director:'',
            country: '',
            mpaa_rating: '',
            availability_type: '',
            price: 0.00,
            currentTab : 0
        }
    }

    handleChange = (events) => {
        this.setState({
            [events.target.name]: events.target.value
        })   
    }
    handleSubmit = (e) => {
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
        // var movieID = this.props.margin.params.movieID;
        // axios.get(`${api}/movies/${movieID}`)
        //     .then((resposne) => {
        //         this.setState({
        //             title : resposne.data.title,
        //             genre : resposne.data.genre
        //         })
        // })
    }
    render(){
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
            border: "1px solid #aaaaaa"
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
                    <button style={styleButton1} type="button" id="prevBtn" onClick={this.handlePrev}>Previous</button>
                )
                        
            }else{
                PrevButton = (
                    <button style={styleButton2} type="button" id="prevBtn" onClick={this.handlePrev}>Previous</button>
                )
            }
        let nextButton = null;
        if(this.state.currentTab == 3){
            nextButton = (
                <button style={styleButton2} type="button" id="prevBtn" onClick={this.handleSubmit}>Submit</button>
            )
                    
        }else{
            nextButton = (
                <button style={styleButton2} type="button" id="prevBtn" onClick={this.handleNext}>Next</button>
            )
        }
        return(
            <div>
                <Navbar/>
                <br/>
                    <form style={styleForm}>
                        <h1 style={{textAlign : "center"}}>{FormTitle} a Movie:</h1>
                        
                        <div style={{display: this.state.currentTab === 0 ? 'block' : 'none', fontSize : "14pt" }}>Basic Movie Details:
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Movie Title" oninput="this.className = ''" name="title"/></p>
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Movie Genre" oninput="this.className = ''" name="genre"/></p>
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Studio Name" oninput="this.className = ''" name="studio_name"/></p>
                        </div>
                        <div style={{display: this.state.currentTab === 1 ? 'block' : 'none' }}>Basic Movie Details:
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Synopsis" oninput="this.className = ''" name="synopsis"/></p>
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Image URL" oninput="this.className = ''" name="image_url"/></p>
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Youtube URL" oninput="this.className = ''" name="youtube_url"/></p>
                        </div>
                        <div style={{display: this.state.currentTab === 2 ? 'block' : 'none' }}>Basic Movie Details:
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Actor" oninput="this.className = ''" name="actors"/></p>
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Actresses" oninput="this.className = ''" name="actresses"/></p>
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Director" oninput="this.className = ''" name="director"/></p>
                        </div>
                        <div style={{display: this.state.currentTab === 3 ? 'block' : 'none' }}>Basic Movie Details:
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Country" oninput="this.className = ''" name="country"/></p>
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="MPAA Rating" oninput="this.className = ''" name="mpaa_rating" type="text"/></p>
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Availability Type" oninput="this.className = ''" name="availability_type" type="text"/></p>
                            <p><input onChange = {this.handleChange} style = {styleInput} placeholder="Price" oninput="this.className = ''" name="price" type="text"/></p>
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