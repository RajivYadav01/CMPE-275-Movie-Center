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
            comments : this.state.reviewText,
            movieID : this.props.match.params.movieID,
            rating : this.state.rating,
            userId : localStorage.getItem("userId"),
            userFirstName : localStorage.getItem("firstName"),
            userLastName : localStorage.getItem("lastName")
        }
        console.log("New Review Deatils : ", newReviewDetails);
        this.props.onSubmitReviewClicked(newReviewDetails);
    
    }
    render(){
        let actorCast = null;
        let actressCast = null;
        var actorsArr = this.state.actors.split(',');
        var actressArr = this.state.actresses.split(',');
        var youtubeUrlSplit = this.state.youtubeUrl.split('/');
        var youTube = `https://www.youtube.com/embed/${youtubeUrlSplit[youtubeUrlSplit.length - 1]}` ; 
        console.log("You SRC : ", youTube);
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
                <div>
                    <li style = {{color : "white", width:"100%"}}>
                        <div style = {{float : "left", paddingLeft : "20px"}}>
                            <h4>{review.userFirstName}&nbsp;&nbsp;{review.userLastName}</h4>    
                        </div>
                        <div style={{float : "right", paddingRight : "20px"}}>
                            <h5>{review.rating}/5</h5>
                        </div>
                        <br/><br/>
                        <p style={{float : "left", paddingLeft : "20px"}}>{review.comments}</p>
                        <br/>
                    </li>
                <br/><br/>
                </div>
            )
        })
        const { rating } = this.state.rating;
        return(
            <div >
                <Navbar/>
                <div class="bg-wrapper" style={{opacity : "0.25"}}> 
                    <img class="bg-img " src="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg" srcset="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w" alt="" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-8">
                            <main className="site-main">
                                <article className="post">
                                    <header style={{paddingTop : "20px", paddingLeft : "20px"}}>
                                        <h4 className="h4Label">{this.state.title}</h4>
                                        <br/>
                                        <figure class="post-thumbnail" style={{paddingLeft : "0px"}}>
                                            <img width="700" height="460" src="https://ld-wp.template-help.com/wordpress_51822/wp-content/uploads/2016/02/img4-770x480.jpg" class="post-thumbnail__img wp-post-image" alt="img4" srcset="https://ld-wp.template-help.com/wordpress_51822/wp-content/uploads/2016/02/img4-770x480.jpg 770w, https://ld-wp.template-help.com/wordpress_51822/wp-content/uploads/2016/02/img4-560x350.jpg 560w" sizes="(max-width: 770px) 100vw, 770px"/> 
                                        </figure>
                                        <br/>
                                        <div class="entry-content" style={{paddingLeft : "0px", paddingBottom : "30px"}}>
                                            <h4 style={{color: "grey"}} ><span style={{color: "#ffffff"}}>Released in:</span> 2011</h4>
                                            <h4 style={{color: "grey"}} ><span style={{color: "#ffffff"}}>Genre:</span> {this.state.genre}</h4>
                                            <h4 style={{color: "grey"}} ><span style={{color: "#ffffff"}}>Directed by:</span> {this.state.director}</h4>
                                            <h4 style={{color: "grey"}}><span style={{color: "#ffffff"}}>Cast:</span>{this.state.actors},{this.state.actresses}</h4>
                                        </div>
                                    </header>
                                </article>
                            </main>
                        </div>
                        <aside id="recent-comments-3" class="widget widget_recent_comments" style={{paddingTop : "30px"}}>
                            <h4 class="h4Label">RECENT COMMENTS
                            </h4>
                            <ul style={{color : "white"}}>
                                {reviewDetails}
                            </ul>
                            <br/>
                            <br/>
                            <button href="#reviewModal" class="delete" data-toggle="modal" style={{alignSelf:"center", width : "33%" ,fontSize : "14pt"}} type="button" class="btn btn-primary">
                                Add a Review
                            </button>
                            <br/>
                            <br/>
                            <button href="#playVideoModal" class="delete" data-toggle="modal" style={{alignSelf:"center", width : "33%" ,fontSize : "14pt"}} type="button" class="btn btn-success">
                                Play
                            </button>
                        </aside>
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
                        <div class="modal fade" id="playVideoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document" style={{maxWidth: "800px", margin: "30px auto"}}>
                                <div class="modal-content">
                                    <div class="modal-body" style={{position:"relative",padding:"0px"}}>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close" style={{position:"absolute",right:"-30px",top:"0",zIndex:"999",fontSize:"2rem",fontWeight: "normal",color:"#fff",opacity:"1"}}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>        
                                        <div class="embed-responsive embed-responsive-16by9">
                                            <iframe class="embed-responsive-item" src={youTube} id="video"  allowscriptaccess="always" allowFullScreen="true"></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
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