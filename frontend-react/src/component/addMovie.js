import React, {Component} from 'react';
import Navbar from '../component/Navbar';
import {connect} from 'react-redux';
import {CreateMovie} from '../store/actions';
import {UpdateMovie} from '../store/actions';
import {Link} from 'react-router-dom';
import '../App.css';
import axios from 'axios';

import {api} from '../store/actions';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

class AddMovie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            genre: '',
            studioName: '',
            synopsis: '',
            imageUrl: '',
            youtubeUrl: '',
            actors: '',
            actresses: '',
            director: '',
            country: '',
            mpaaRating: '',
            availabilityType: '',
            price: 0.00,
            currentTab: 0,
            yearOfRelease : ''
        }
    }

    handleChange = (events) => {
        this.setState({
            [events.target.name]: events.target.value
        })
    };

    handleSubmit = (e, formTitle) => {
        e.preventDefault();
        console.log("Inside Submit");
        var newMovieDetails = {
            title: this.state.title,
            genre: this.state.genre,
            studioName: this.state.studioName,
            synopsis: this.state.synopsis,
            imageUrl: this.state.imageUrl,
            youtubeUrl: this.state.youtubeUrl,
            actors: this.state.actors,
            actresses: this.state.actresses,
            director: this.state.director,
            country: this.state.country,
            mpaaRating: this.state.mpaaRating,
            availabilityType: this.state.availabilityType,
            price: this.state.price,
            yearOfRelease : this.state.yearOfRelease
        };
        console.log("New Movie Details : ", newMovieDetails);
        if (this.props.match.params.movieID != -1) {
            console.log("Movie ID : ", this.props.match.params.movieID);
            this.props.onUpdateClicked(newMovieDetails, this.props.match.params.movieID);
        } else {
            this.props.onSubmitClicked(newMovieDetails);
        }

    };

    handlePrev = (e) => {
        e.preventDefault();
        this.setState({
            currentTab: (this.state.currentTab - 1)
        })
    };

    handleNext = (e) => {
        e.preventDefault();
        this.setState({
            currentTab: (this.state.currentTab + 1)
        })
    };

    componentWillMount() {
        var movieID = this.props.match.params.movieID;
        console.log("Movie ID : ", movieID);
        axios.get(`${api}/movies/${movieID}`, {
            headers: {"Authorization": localStorage.getItem("Authorization")}
        })
            .then((response) => {
                console.log("Response : ", response);
                this.setState({
                    title: response.data.title,
                    genre: response.data.genre,
                    studioName: response.data.studioName,
                    synopsis: response.data.synopsis,
                    imageUrl: response.data.imageUrl,
                    youtubeUrl: response.data.youtubeUrl,
                    actors: response.data.actors,
                    actresses: response.data.actresses,
                    director: response.data.director,
                    country: response.data.country,
                    mpaaRating: response.data.mpaaRating,
                    availabilityType: response.data.availabilityType,
                    price: response.data.price,
                    yearOfRelease : response.data.yearOfRelease
                })
            })
    }

    render() {
        console.log("State : ", this.state);
        console.log("Params : ", this.props.match.params.movieID);
        let FormTitle = "Add";

        if (this.props.match.params.movieID != -1) {
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
        };

        const styleInput = {
            padding: "10px",
            width: "100%",
            fontSize: "17px",
            fontFamily: "Raleway",
            border: "2px solid #aaaaaa",
            color: "red"
        };

        const styleButton1 = {
            backgroundColor: "#4CAF50",
            color: "#ffffff",
            border: "none",
            padding: "10px 20px",
            fontSize: "17px",
            fontFamily: "Raleway",
            cursor: "pointer",
            marginLeft: "5px",
            display: "none"
        };

        const styleButton2 = {
            backgroundColor: "#4CAF50",
            color: "#ffffff",
            border: "none",
            padding: "10px 20px",
            fontSize: "17px",
            fontFamily: "Raleway",
            cursor: "pointer",
            marginLeft: "5px",
            display: "inline"
        };

        const stepStyle = {
            height: "15px",
            width: "15px",
            margin: "0 2px",
            backgroundColor: "#bbbbbb",
            border: "none",
            borderRadius: "50%",
            display: "inline-block",
            opacity: "0.75"
        };

        let PrevButton = null;
        if (this.state.currentTab === 0) {
            PrevButton = (
                <button className=" signUpBtn btn btn-primary form-control"
                        type="button" id="prevBtn"
                        onClick={(e) => this.handlePrev(e, FormTitle)}>
                    Previous
                </button>
            )
        } else {
            PrevButton = (
                <button className=" signUpBtn btn btn-primary form-control"
                        type="button" id="prevBtn"
                        onClick={(e) => this.handlePrev(e, FormTitle)}>
                    Previous
                </button>
            )
        }
        let nextButton = null;
        if (this.state.currentTab === 3) {
            nextButton = (
                <button className=" signUpBtn btn btn-primary form-control"
                        type="button" id="prevBtn"
                        onClick={(e) => this.handleSubmit(e, FormTitle)}>
                    Submit
                </button>
            )

        } else {
            nextButton = (
                <button className=" signUpBtn btn btn-primary form-control"
                        type="button" id="prevBtn"
                        onClick={(e) => this.handleNext(e, FormTitle)}>
                    Next
                </button>
            )
        }
        return (
            <div>
                <Navbar/>
                <div class="bg-wrapper" style={{opacity: ".75"}}>
                    <img class="bg-img "
                         src="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg"
                         srcset="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w"
                         alt=""/>
                </div>
                <br/>
                <div className="main-center" style={{width: "40%"}}>
                    <form className="sign-in-form">
                        <h1 className="h4Label">{FormTitle} a Movie:</h1>

                        <div style={{display: this.state.currentTab === 0 ? 'block' : 'none', fontSize: "16pt"}}>
                            <p>
                                <input className="inputField form-control" onChange={this.handleChange}
                                       placeholder="Movie Title" name="title"
                                       value={this.state.title} required/>
                            </p>
                            <p>
                                <input className="inputField form-control" onChange={this.handleChange}
                                      placeholder="Movie Genre" name="genre" value={this.state.genre} required/>
                            </p>
                            <p>
                                <input className="inputField form-control" onChange={this.handleChange}
                                      placeholder="Studio Name" name="studioName"
                                      value={this.state.studioName} required/>
                            </p>
                        </div>

                        <div style={{display: this.state.currentTab === 1 ? 'block' : 'none', fontSize: "16pt"}}>
                            <p>
                                <input className="inputField form-control" onChange={this.handleChange}
                                      placeholder="Synopsis" name="synopsis"
                                      value={this.state.synopsis} required/>
                            </p>
                            <p><input className="inputField form-control" onChange={this.handleChange}
                                      placeholder="Image URL" name="imageUrl"
                                      value={this.state.imageUrl} required/>
                            </p>
                            <p><input className="inputField form-control" onChange={this.handleChange}
                                      placeholder="Youtube URL" name="youtubeUrl"
                                      value={this.state.youtubeUrl} required/>
                            </p>
                        </div>

                        <div style={{display: this.state.currentTab === 2 ? 'block' : 'none', fontSize: "16pt"}}>
                            <p><input className="inputField form-control" onChange={this.handleChange}
                                      placeholder="Actor" name="actors"
                                      value={this.state.actors} required/>
                            </p>
                            <p><input className="inputField form-control" onChange={this.handleChange}
                                      placeholder="Actresses" name="actresses"
                                      value={this.state.actresses} required/>
                            </p>
                            <p><input className="inputField form-control" onChange={this.handleChange}
                                      placeholder="Director" name="director"
                                      value={this.state.director} required />
                            </p>
                            <p>
                                <input className="inputField form-control" onChange={this.handleChange}
                                      placeholder="Year of Release" name="yearOfRelease"
                                      value={this.state.yearOfRelease} required />
                            </p>

                        </div>

                        <div style={{display: this.state.currentTab === 3 ? 'block' : 'none', fontSize: "16pt"}}>
                            <p><input className="inputField form-control" onChange={this.handleChange}
                                      placeholder="Country" name="country"
                                      value={this.state.country} required />
                            </p>
                            <p>
                                <select className="inputField form-control" name='mpaaRating'
                                        onChange={this.handleChange} >
                                    <option value="" disabled selected> MPAA Rating</option>
                                    <option value="G" selected={this.state.mpaaRating === "G" ? "selected" : null}> G </option>
                                    <option value="PG" selected={this.state.mpaaRating === "PG" ? "selected" : null} > PG </option>
                                    <option value="PG-13" selected={this.state.mpaaRating === "PG-13" ? "selected" : null}> PG-13 </option>
                                    <option value="R" selected={this.state.mpaaRating === "R" ? "selected" : null} > R </option>
                                    <option value="NC-17" selected={this.state.mpaaRating === "NC-17" ? "selected" : null}> NC-17 </option>
                                </select>
                            </p>
                            <p>
                                <select className="inputField form-control" name='availabilityType'
                                        onChange={this.handleChange} >
                                    <option value="" disabled selected>Availability Type</option>
                                    <option value="free" selected={this.state.availabilityType === "free" ? "selected" : null}> Free </option>
                                    <option value="subscriptiononly" selected={this.state.availabilityType === "subscriptiononly" ? "selected" : null} > Subscription Only </option>
                                    <option value="payperview" selected={this.state.availabilityType === "payperview" ? "selected" : null} > Pay-Per-View </option>
                                    <option value="paid"  selected={this.state.availabilityType === "paid" ? "selected" : null} > Paid </option>
                                </select>
                            </p>
                            <p><input className="inputField form-control" onChange={this.handleChange}
                                      placeholder="Price" name="price" type="text" required/>
                            </p>
                        </div>

                        <div style={{overflow: "auto"}}>
                            <div style={{float: "left"}}>
                                {PrevButton}
                            </div>
                            <div style={{float: "right"}}>
                                {nextButton}
                            </div>
                        </div>

                        <div style={{textAlign: "center", marginTop: "40px"}}>
                            <span style={stepStyle}/>
                            <span style={stepStyle}/>
                            <span style={stepStyle}/>
                            <span style={stepStyle}/>
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    if(state.status == 'MOVIE_UPDATE_SUCCESS'){
        alert("Movie Updated Successfully");
        history.push("/admin/delete");
        
    }
    return {
        status: state.status,
        msg: state.msg,
    };
    
};

const mapDispatchToProps = dispatch => {
    console.log("Inside map dipatch to props");
    return {
        onSubmitClicked: (details) => dispatch(CreateMovie(details)),
        onUpdateClicked: (details, movieID) => dispatch(UpdateMovie(details, movieID)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMovie);