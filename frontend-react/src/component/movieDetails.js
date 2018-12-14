import React,{Component} from 'react';
import Navbar from '../component/Navbar';
import '../css/movieDetails.css';
import '../App.css';
import axios from 'axios';
import {api} from '../store/actions';
import StarRatingComponent from 'react-star-rating-component';
import {CreateReview} from '../store/actions';
import {connect} from 'react-redux';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
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
            rating : 1,
            cardNumber : '',
            expiryYear : '',
            expiryMonth : '',
            cardName : '',
            cardCVC : '',
            months : '',
            amount : '',
            paymentSuccess : false,
            yearOfRelease : '',
            moviePlayed : false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleMonths = this.handleMonths.bind(this);
        this.handleSubscription = this.handleSubscription.bind(this);
    }

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        });
        console.log(this.state)
    };

    handleMonths = (e) => {
        e.preventDefault();
        let num = e.target.value;
        this.setState({
            amount : 10*num
        });
        console.log(this.state);
    };

    handleSubscription = (e) => {
        e.preventDefault();
        var obj = {
            cvv : this.state.cvv,
            cardNumber : this.state.cardName,
            expiryMonth : this.state.expiryMonth,
            expiryYear : this.state.expiryYear,
            nameOnCard : this.state.nameOnCard,
            amount : this.state.amount,
            paymentType : "payperview",
            movieId : this.props.match.params.movieID
        }
        var userId = localStorage.getItem("userId")
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        axios({
            method: 'post',
            url: `${api}/users/${userId}/moviepayment`,
            mode: 'no-cors',
            redirect: 'follow',
            withCredentials: false,
            headers: {'Accept': 'application/json', 'Authorization' :localStorage.getItem('Authorization')},
            data: obj
        }).then((response) => {
                console.log("Res : ", response.data);
                var obj2 = {
                    userId : localStorage.getItem("userId"),
                    movieId : this.props.match.params.movieID,
                    subscriptionType : this.state.availabilityType
                }
                axios(`${api}/users/play`,{
                    method: 'post',
                    mode: 'no-cors',
                    redirect: 'follow',
                    withCredentials: false,
                    headers: headers,
                    data: obj2
                }).then((response) => {
                    alert("Payment Successfully")
                    document.getElementById("paymentClose").click();
                    
                })
            })

        //Axios request to store details in Database

    };

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
                    price : response.data.price,
                    modalName : '',
                    yearOfRelease : response.data.yearOfRelease
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
    handlePlayCheck = (e) => {
        //e.preventDefault();
        var movieAvailability = this.state.availabilityType;
        var userType = localStorage.getItem("userType");
        var isSubscribed = localStorage.getItem("isSubscribed");
        var userId = localStorage.getItem("userId");

        console.log("A : ", movieAvailability.toLowerCase() , " UT : ", userType, " iS : ", isSubscribed);

        switch(movieAvailability.toLowerCase()){
            case "free":{
                var headers = new Headers();
                headers.append('Content-Type', 'application/json');
                console.log("Case Free");
                if(userType==="customer"){
                    var obj = {
                        userId : localStorage.getItem("userId"),
                        movieId : this.props.match.params.movieID,
                        subscriptionType : this.state.availabilityType
                    }
                    axios(`${api}/users/play`,{
                        method: 'post',
                        mode: 'no-cors',
                        redirect: 'follow',
                        withCredentials: false,
                        headers: headers,
                        data: obj
                    }).then((response) => {
                        document.getElementById("videoButton").click();
                        this.setState({
                            moviePlayed : true
                        })
                    })
                }
                if(userType==="admin"){
                    document.getElementById("videoButton").click();
                }
                break;
            }
            case "payperview":{
                console.log("Case PayPerView");
                if(userType === "customer"){
                    axios({
                        method: 'get',
                        url: `${api}/users/${userId}/movie/${this.props.match.params.movieID}/checkifpaymentneeded`,
                        mode: 'no-cors',
                        redirect: 'follow',
                        withCredentials: false,
                        headers: {'Accept': 'application/json', 'Authorization' :localStorage.getItem('Authorization')},
                        data: {movieId : this.props.match.params.movieID}
                    }).then((response) => {
                        if(response.data.data === "PAYMENTNEEDED"){
                            if(isSubscribed==="true"){     
                                console.log("Inside PPV True")
                                this.setState({
                                    amount : this.state.price * .5
                                })       
                                console.log("SUbscribed False PPV");
                                document.getElementById("paymentButton").click();
                            }else if(isSubscribed==="false"){
                                console.log("SUbscribed True PPV");
                                this.setState({
                                    amount : this.state.price
                                })
                                document.getElementById("paymentButton").click();
                            }
                        }else{
                            document.getElementById("videoButton").click(); 
                            this.setState({
                                moviePlayed : true
                            })  
                        }
                    })
                }
                if(userType==="admin"){
                    document.getElementById("videoButton").click();
                    this.setState({
                        moviePlayed : true
                    })
                }
                break; 
            }
            case "paid":{
                console.log("Case Paid");
                if(userType === "customer"){
                    axios({
                        method: 'get',
                        url: `${api}/users/${userId}/movie/${this.props.match.params.movieID}/checkifpaymentneeded`,
                        mode: 'no-cors',
                        redirect: 'follow',
                        withCredentials: false,
                        headers: {'Accept': 'application/json', 'Authorization' :localStorage.getItem('Authorization')},
                        data: {movieId : this.props.match.params.movieID}
                    }).then((response) => {
                        if(response.data.data === "PAYMENTNEEDED"){
                            var obj = {
                                userId : localStorage.getItem("userId"),
                                movieId : this.props.match.params.movieID,
                                subscriptionType : this.state.availabilityType
                            }
                            if(isSubscribed === "true"){
                                axios(`${api}/users/play`,{
                                    method: 'post',
                                    mode: 'no-cors',
                                    redirect: 'follow',
                                    withCredentials: false,
                                    headers: headers,
                                    data: obj
                                }).then((response) => {
                                    document.getElementById("videoButton").click();
                                    this.setState({
                                        moviePlayed : true
                                    })
                                })
                            }else if(isSubscribed === "false"){
                                this.setState({
                                    amount : this.state.price
                                })
                                document.getElementById("paymentButton").click();
                            }
                        }else{
                            document.getElementById("videoButton").click();  
                            this.setState({
                                moviePlayed : true
                            })
                        }
                    })
                }
                if(userType==="admin"){
                    document.getElementById("videoButton").click();
                }
                break;
            }

            case "subscriptiononly":{
                console.log("Case Subscription Only");
                if(userType==="customer"){
                    if(isSubscribed === "true"){
                        console.log("All True");
                        var obj = {
                            userId : localStorage.getItem("userId"),
                            movieId : this.props.match.params.movieID,
                            subscriptionType : movieAvailability
                        }
                        console.log("Obj Sent : ", obj);
                        var headers = new Headers();
                        headers.append('Accept', 'application/json');
                        axios(`${api}/users/play`,{
                            method: 'post',
                            mode: 'no-cors',
                            redirect: 'follow',
                            withCredentials: false,
                            headers: headers,
                            data: obj
                        }).then((response) => {
                           document.getElementById("videoButton").click();
                           this.setState({
                               moviePlayed : true
                           })
                        })
                    }else if(isSubscribed==="false" ){
                        console.log("Some False");
                        document.getElementById("subscribeButton").click();
                    }
                }
                if(userType==="admin"){
                    document.getElementById("videoButton").click();
                }
                break;
            }
        }
    }
    handleReviewText = (e) =>{
        this.setState({
            reviewText : e.target.value
        })
    }
    submitReviewText = (e) => {
        //e.preventDefault();
        var newReviewDetails = {
            comments : this.state.reviewText,
            movieId : this.props.match.params.movieID,
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
        let showReviewButton = false;
        let userId = localStorage.getItem("userId")
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
        if(this.state.moviePlayed){
            showReviewButton = true;
        }
        this.state.reviews.map((review)=>{
            if(review.userId === userId){
                showReviewButton = true;
            }
        })
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
                                            <img width="700" height="460" src={this.state.imageUrl} sizes="(max-width: 770px) 100vw, 770px"/> 
                                        </figure>
                                        <br/>
                                        <div class="entry-content" style={{paddingLeft : "0px", paddingBottom : "30px"}}>
                                            <h4 style={{color: "grey"}} ><span style={{color: "#ffffff"}}>Released in:</span>{this.state.yearOfRelease}</h4>
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
                            {showReviewButton ? <button href="#reviewModal" class="delete" data-toggle="modal" style={{alignSelf:"center", width : "33%" ,fontSize : "14pt"}} type="button" class="btn btn-primary">
                                Add a Review
                            </button> : null}
                            <br/>
                            <br/>
                            <button onClick = {this.handlePlayCheck} class="delete" data-toggle="modal" style={{alignSelf:"center", width : "33%" ,fontSize : "14pt"}} type="button" class="btn btn-success">
                                Play
                            </button>
                            <button id="videoButton" href="#playVideoModal" class="delete" data-toggle="modal" style={{display : "none"}} type="button" class="btn btn-success">
                                Play
                            </button>
                            <button id="subscribeButton" href="#subscriptionModal" class="delete" data-toggle="modal" style={{display : "none"}} type="button" class="btn btn-success">
                                Play
                            </button>
                            <button id="paymentButton" href="#paymentModel" class="delete" data-toggle="modal" style={{display : "none"}} type="button" class="btn btn-success">
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
                                            <iframe class="embed-responsive-item" src={youTube} id="video"  allowscriptaccess="always" allowFullScreen="allowFullScreen"></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="subscriptionModal" class="modal fade">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <form>
                                        <div class="modal-header">						
                                            <h4 class="modal-title">This movie is available Only for Subscribed users</h4>
                                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                        </div>
                                        <div class="modal-footer">
                                            <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel"/>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div class="modal fade" id="paymentModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document" style={{maxWidth: "400px", margin: "30px auto"}}>
                                <div class="modal-content">
                                    <div class="modal-header">						
                                            <h4 class="modal-title">Payment</h4>
                                            <button id="paymentClose" type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                    </div>
                                    <div className="panel panel-default credit-card-box" >
                                                        <div className="panel-heading display-table">
                                                            <div className="row display-tr">
                                                                <h3 className="panel-title display-td" style={{marginLeft:'10px'}}>Payment Details</h3>
                                                                <br/>
                                                                <div className="display-td">
                                                                    <img src="http://i76.imgup.net/accepted_c22e0.png"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="panel-body">
                                                            <form id="payment-form">
                                                                <div className="row">
                                                                    <div className="col-xs-12">
                                                                        <div className="form-group">
                                                                            <label htmlFor="cardNumber">CARD NUMBER</label>
                                                                            <div className="input-group" style={{width:"100%"}}>
                                                                                <input
                                                                                    type="tel"
                                                                                    className="form-control"
                                                                                    name="cardNumber"
                                                                                    placeholder="Valid Card Number"
                                                                                    autoComplete="cc-number"
                                                                                    onChange={this.handleChange}
                                                                                    required autoFocus
                                                                                />
                                                                                {/*<span className="input-group-addon"><i*/}
                                                                                    {/*className="fa fa-credit-card"></i></span>*/}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-xs-12">
                                                                        <div className="form-group">
                                                                            <label htmlFor="cardNumber">NAME ON CARD</label>
                                                                            <div className="input-group" style={{width:"100%"}}>
                                                                                <input
                                                                                    type="tel"
                                                                                    className="form-control"
                                                                                    name="cardName"
                                                                                    placeholder="NAME"
                                                                                    autoComplete="cc-number"
                                                                                    onChange={this.handleChange}
                                                                                    required autoFocus
                                                                                />
                                                                                {/*<span className="input-group-addon"><i*/}
                                                                                {/*className="fa fa-credit-card"></i></span>*/}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-xs-7 col-md-7">
                                                                        <div className="form-group">
                                                                            <label htmlFor="cardExpiry"><span
                                                                                className="hidden-xs">EXPIRATION MONTH</span>
                                                                            </label>
                                                                            <input
                                                                                type="tel"
                                                                                className="form-control col-xs-2 col-md-2"
                                                                                name="expiryMonth"
                                                                                placeholder="MM"
                                                                                autoComplete="cc-exp"
                                                                                onChange={this.handleChange}
                                                                                required
                                                                            />
                                                                            <br/>
                                                                            <label htmlFor="cardExpiry"><span
                                                                                className="hidden-xs">EXPIRATION YEAR</span>
                                                                            </label>
                                                                            <input
                                                                                type="tel"
                                                                                className="form-control col-xs-2 col-md-2 pull-right"
                                                                                name="expiryYear"
                                                                                placeholder="YY"
                                                                                autoComplete="cc-exp"
                                                                                onChange={this.handleChange}
                                                                                required
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-xs-5 col-md-5 pull-right">
                                                                        <div className="form-group">
                                                                            <label htmlFor="cardCVC">CV CODE</label>
                                                                            <input
                                                                                type="tel"
                                                                                className="form-control"
                                                                                name="cardCVC"
                                                                                placeholder="CVC"
                                                                                autoComplete="cc-csc"
                                                                                onChange={this.handleChange}
                                                                                required
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="row">
                                                                    <div className="col-xs-5 col-md-5 pull-right">
                                                                        <div className="form-group">
                                                                            <label htmlFor="cardCVC">Amount</label>
                                                                            <input
                                                                                type="tel"
                                                                                className="form-control"
                                                                                name="amount"
                                                                                placeholder=""
                                                                                autoComplete="cc-csc"
                                                                                value={this.state.amount}
                                                                                disabled={true}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <br/>
                                                                <div className="row">
                                                                    <div className="col-xs-12">
                                                                        <button className="subscribe btn btn-success btn-lg btn-block"
                                                                                type="button"
                                                                                onClick={this.handleSubscription}>Start Subscription
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                                <div className="row" style={{display:'none'}}>
                                                                    <div className="col-xs-12">
                                                                        {/*<p className="payment-errors"></p>*/}
                                                                    </div>
                                                                </div>
                                                            </form>
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