import React,{Component} from 'react';
import Navbar from '../component/Navbar';
import '../css/movieDetails.css';
import '../App.css';
import axios from 'axios';
import {api} from '../store/actions';
import StarRatingComponent from 'react-star-rating-component';
import {CreateReview} from '../store/actions';
import {connect} from 'react-redux';
class movieDetails extends Component{
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
            reviews : [],
            reviewText : '',
            rating : 1
        }
    }
    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
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
        axios.get(`${api}/reviews/?movieid=${movieID}`,{
            headers: {"Authorization" : localStorage.getItem("Authorization")}})
            .then((response) => {
                console.log("Response : ", response);
                this.setState({
                    reviews : response.data
                })
        })
        
    }
    handleReviewText = (e) =>{
        this.setState({
            reviewText : e.target.value
        })
    }
    submitReviewText = (e) => {
        e.preventDefault();
        var newReviewDetails = {
            comment : this.state.reviewText,
            movieID : this.props.match.params.movieID,
            rating : this.state.rating,
            userId : "744nu61fY3gugMZF3ldtDY802CjSaq",
            userFirstName : "Rajiv",
            userLastName : "Yadav"
        }
        console.log("New Review Deatils : ", newReviewDetails);
        this.props.onSubmitReviewClicked(newReviewDetails);
    
    }
    render(){
        let actorCast = null;
        let actressCast = null;
        var actorsArr = this.state.actors.split(',');
        var actressArr = this.state.actresses.split(',');
        if(actorsArr.length > 0){
            actorCast = actorsArr.map((actor,index) => {
                return(
                    <div class="column" style={{paddingTop : "20px"}}>
                        <div class="card" style = {{backgroundColor: "rgba(0,0,0,.75)", color : "white"}}>
                            <h4 style = {{color: "#fff",fontSize: "32px",fontWeight: "700",marginBottom: "28px"}}>{actor}</h4>
                            <p>Actor</p>
                        </div>
                    </div>
                )
            })
        }
        if(actressArr.length > 0){
            actressCast = actressArr.map((actress,index) => {
                return(
                    <div class="column" style={{paddingTop : "20px"}}>
                        <div class="card" style = {{backgroundColor: "rgba(0,0,0,.75)", color : "white"}}>
                            <h4 style = {{color: "#fff",fontSize: "32px",fontWeight: "700",marginBottom: "28px"}}>{actress}</h4>
                            <p>Actress</p>
                        </div>
                    </div>
                )
            })
        }

        actorCast =  actorCast.concat(actressCast);
        let reviewDetails = null;
        reviewDetails = this.state.reviews.map((review,index) => {
            return(
                <tr style={{backgroundColor:"white", color : "black"}}>
                    <td>
                        <p style = {{float : "left"}}><b>{review.userFirstName}&nbsp;&nbsp;{review.userLastName}</b></p>
                        <p style={{float : "right"}}>{review.rating}/5</p>
                        <br/>
                        <p>{review.comments}</p>
                    </td> 
                </tr>
            )
        })
        const { rating } = this.state.rating;
        return(
            <div >
                <Navbar/>
                <div class="bg-wrapper" style={{opacity : ".2"}}>
                    <img class="bg-img " src="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt="" />
                </div>
                <div style = {{color : "white", margin:"5%"}} class="row">
                    <div class="col-sm-3" >
                    
                    <div>
                        <img src={this.state.imageUrl} alt="movieImage" style={{width:"100%"}}/>
                        <h1>{this.state.title}</h1>
                        <p class="title">{this.state.genre}</p>
                        <p class="title">{this.state.director}</p>
                    </div>
                    </div>
                    <div class="col-sm-6" >
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="col-sm-3" >
                        <button href="#reviewModal" class="delete" data-toggle="modal" style={{alignSelf:"center", width : "100%" }} type="button" class="btn btn-primary">
                            Add a Review
                        </button>
                        <br/><br/>
                        <table id="myTable"  class="table table-striped table-hover">
                        <tbody>
                            {reviewDetails}
                        </tbody>
                    </table>
                    </div>
                </div>
                <h1 style = {{color : "white", marginLeft : "90px"}}>Movie Cast</h1>
                <div class="row" style={{marginLeft : "90px", marginRight : "90px"}}>
                    {actorCast}
                </div>
                <div id="reviewModal" class="modal fade">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <form>
                                <div class="modal-header">						
                                    <h4 class="modal-title">Add a review</h4>
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                </div>
                                <div class="modal-body">
                                    <label>Review Text</label>
                                    <br/>				
                                    <textarea onChange={this.handleReviewText} cols="100" rows="5" style={{width : "100%"}}></textarea>
                                    <label>Rate the movie</label>
                                    <br/>
                                    <StarRatingComponent 
                                        name="rate1" 
                                        starCount={5}
                                        value={rating}
                                        onStarClick={this.onStarClick.bind(this)}
                                    />
                                </div>
                                <div class="modal-footer">
                                    <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel"/>
                                    <input onClick={this.submitReviewText} type="submit" class="btn btn-danger" value="Add a Review"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    console.log("Inside map dipatch to props");
    return{
        onSubmitReviewClicked : (details) => dispatch(CreateReview(details)),
    }
}

export default connect(null,mapDispatchToProps)(movieDetails);