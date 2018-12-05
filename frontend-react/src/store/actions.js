import axios from 'axios';
export const MOVIE_CREATE_SUCCESS = 'MOVIE_CREATE_SUCCESS';
export const MOVIE_CREATE_FAIL = 'MOVIE_CREATE_FAIL';
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_ERROR = "USER_ERROR";
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
export const USER_UPDATE_ERROR = "USER_UPDATE_ERROR";
export const MOVIE_UPDATE_SUCCESS = 'MOVIE_UPDATE_SUCCESS';
export const MOVIE_UPDATE_FAIL = 'MOVIE_UPDATE_FAIL';
export const REVIEW_CREATE_SUCCESS = 'REVIEW_CREATE_SUCCESS';
export const REVIEW_CREATE_FAIL = 'REVIEW_CREATE_FAIL';
export const MOVIE_DELETE_SUCCESS = 'MOVIE_DELETE_SUCCESS';
export const MOVIE_DELETE_FAIL = 'MOVIE_DELETE_FAIL';

export const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://ec2-34-215-125-205.us-west-2.compute.amazonaws.com:8080/movieCenter';

function MovieCreateSuccess(response){
    console.log("Response in Success : ", response);
    return{
        type : MOVIE_CREATE_SUCCESS,
        payload : response
    }
}

function MovieCreateFailed(response){
    console.log("Response in Fail : ", response);
    return{
        type : MOVIE_CREATE_FAIL,
        payload : response
    }
}

function MovieUpdateSuccess(response){
    console.log("Response in Success : ", response);
    return{
        type : MOVIE_UPDATE_SUCCESS,
        payload : response
    }
}

function MovieUpdateFailed(response){
    console.log("Response in Fail : ", response);
    return{
        type : MOVIE_UPDATE_FAIL,
        payload : response
    }
}

function ReviewCreateSuccess(response){
    console.log("Response in Success : ", response);
    return{
        type : REVIEW_CREATE_SUCCESS,
        payload : response
    }
}

function ReviewCreateFailed(response){
    console.log("Response in Fail : ", response);
    return{
        type : REVIEW_CREATE_FAIL,
        payload : response
    }
}

function SuccessResponse(response){
    return{
        type : USER_SUCCESS,
        payload : response
    }
}

function ErrorResponse(response){
    return{
        type : USER_ERROR,
        payload : response
    }
}

function UserUpdateSuccess(response){
    return{
        type : USER_UPDATE_SUCCESS,
        payload : response
    }
}

function UserUpdateError(response){
    return{
        type : USER_UPDATE_ERROR,
        payload : response
    }
}

function LoginSuccess(response){
    return{
        type : LOGIN_SUCCESS,
        payload : response
    }
}

function LoginFailure(response){
    return{
        type : LOGIN_ERROR,
        payload : response
    }
}

export function CreateMovie(MovieDetails){
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    return (dispatch) => {
        const request = axios(`${api}/admin/create_movie/`,{
            method: 'post',
            mode: 'no-cors',
            redirect: 'follow',
            withCredentials: false,
            headers: headers,
            data: MovieDetails
        }).then((response)=>{
            if(response.status == 200){
                dispatch(MovieCreateSuccess(response));
                // history.push('/question');
            }else{
                dispatch(MovieCreateFailed(response))
            }
        })
    }    
}

export function UpdateMovie(MovieDetails, movieID){
    console.log("MovieID in action : ", movieID);
    // var headers = new Headers();
    // headers.append('Accept', 'application/json');
    return (dispatch) => {
        const request = axios(`${api}/admin/update_movie/${movieID}`,{
            method: 'put',
            mode: 'no-cors',
            redirect: 'follow',
            withCredentials: false,
            headers: {"Authorization" : localStorage.getItem("Authorization")},
            data: MovieDetails
        }).then((response)=>{
            if(response.status == 200){
                dispatch(MovieUpdateSuccess(response));
                // history.push('/question');
            }else{
                dispatch(MovieUpdateFailed(response))
            }
        })
    }    
}

function MovieDeleteSuccess(response){
    console.log("Response in Success : ", response);
    return{
        type : MOVIE_DELETE_SUCCESS,
        payload : response
    }
}

function MovieDeleteFailed(response){
    console.log("Response in Fail : ", response);
    return{
        type : MOVIE_DELETE_FAIL,
        payload : response
    }
}

export function DeleteMovieFunc(movieID){
    console.log("MovieID in action : ", movieID);
    return (dispatch) => {
        const request = axios(`${api}/admin/delete_movie/${movieID}`,{
            method: 'delete',
            mode: 'no-cors',
            redirect: 'follow',
            withCredentials: false,
            headers: {"Authorization" : localStorage.getItem("Authorization")},
        }).then((response)=>{
            if(response.status == 200){
                dispatch(MovieDeleteSuccess(response));
                // history.push('/question');
            }else{
                dispatch(MovieDeleteFailed(response))
            }
        })
    }    
}

export function CreateReview(ReviewDetails){
    console.log("Review Details in action  : ", ReviewDetails);
    // var headers = new Headers();
    // headers.append('Accept', 'application/json');
    return (dispatch) => {
        const request = axios(`${api}/reviews`,{
            method: 'post',
            mode: 'no-cors',
            redirect: 'follow',
            withCredentials: false,
            headers: {"Authorization" : localStorage.getItem("Authorization")},
            data: ReviewDetails
        }).then((response)=>{
            if(response.status == 200){
                dispatch(ReviewCreateSuccess(response));
                // history.push('/question');
            }else{
                dispatch(ReviewCreateFailed(response))
            }
        })
    }    
}

export function SignInAction(UserDetails){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    return (dispatch) => {
        const request = axios(`${api}/users/login`,{
            method: 'post',
            mode: 'no-cors',
            redirect: 'follow',
            withCredentials: false,
            headers: headers,
            data: UserDetails
        }).then((response)=>{
            if(response.status == 200){
                console.log(response);
                var userObj = response.data;
                localStorage.setItem("Authorization", response.headers["authorization"]);
                localStorage.setItem("userId", userObj.userId);
                localStorage.setItem("firstName", userObj.firstName);
                localStorage.setItem("lastName", userObj.lastName);
                localStorage.setItem("userType", userObj.userType);
                localStorage.setItem("email", userObj.email);
                localStorage.setItem("isSubscribed", userObj.isSubscribed);
                var obj = {
                    lastName : 'puttest',
                    firstName : 'verifyput'
                }
                UpdateUser(obj);
                dispatch(LoginSuccess(response.data));
            }else{
                dispatch(LoginFailure(response));
            }
        })
        .catch(function (error) {
            dispatch(LoginFailure(error));
        });
    }  
    
}

export function GetUserDetail(userId){
    return (dispatch) => {
        axios({
            method:'get',
            url: `${api}/users/`+userId,
            headers: {'Accept': 'application/json', 'Authorization' :localStorage.getItem('Authorization')}
        })
        .then((response) => {
            if(response.status == 200){
               // dispatch(SuccessResponse(response.data));

                var data = response.data;
                axios({
                    method:'get',
                    url: `${api}/users/`+userId+`/checksubscription`,
                    headers: {'Accept': 'application/json', 'Authorization' :localStorage.getItem('Authorization')},
                })
                .then((resp) => {
                    if(resp.status == 200){
                        if(resp.data.data != null){
                            try{
                                data["subscriptionEnddate"]= formatDate(new Date(resp.data.data.endDate));
                            } catch(e){
                                console.log("error"+e);
                            }
                        }
                        dispatch(SuccessResponse(data));
                    }
                })
            }else{
                dispatch(ErrorResponse(response));
            }
        })
        .catch(function (error) {
            dispatch(ErrorResponse(error));
        });
    }  
}

export function CreateUser(UserDetails){
   
    return (dispatch) => {
        axios({
            method:'post',
            url: `${api}/users`,
            headers: {'Accept': 'application/json'},
            data: UserDetails
        })
        .then((response) => {
            if(response.status == 200){
                dispatch(SuccessResponse(response));
            }else{
                dispatch(ErrorResponse(response));
            }
        })
        .catch(function (error) {
            dispatch(ErrorResponse(error));
        });
    }  
}

export function UpdateUser(UserDetails){
    return (dispatch) => {
        axios({
            method:'put',
            url: `${api}/users/`+UserDetails.userId,
            headers: {'Accept': 'application/json', 'Authorization' :localStorage.getItem('Authorization')},
            data: UserDetails
        })
        .then((response) => {
            if(response.status == 200){
                dispatch(UserUpdateSuccess(response.data));
            }else{
                dispatch(UserUpdateError(response));
            }
        })
        .catch(function (error) {
            dispatch(UserUpdateError(error));
        });
    }  
}

export function VerifyEmail(token){
    var headers = new Headers();
    headers.append('Accept', 'application/json');
   
    return (dispatch) => {
        axios({
            method:'get',
            url: `${api}/users/email-verification?token=`+token,
            headers: headers,
        })
        .then((response) => {
            if(response.status == 200){
                dispatch(SuccessResponse(response));
            }else{
                dispatch(ErrorResponse(response));
            }
        })
        .catch(function (error) {
            dispatch(ErrorResponse(error));
        });
    }  
}

function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return monthNames[monthIndex] + ' ' + day + ', ' + year;
  }
  


