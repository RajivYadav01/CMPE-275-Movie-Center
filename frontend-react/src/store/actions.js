import axios from 'axios';
// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory();

export const MOVIE_CREATE_SUCCESS = 'MOVIE_CREATE_SUCCESS';
export const MOVIE_CREATE_FAIL = 'MOVIE_CREATE_FAIL';
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const MOVIE_UPDATE_SUCCESS = 'MOVIE_UPDATE_SUCCESS';
export const MOVIE_UPDATE_FAIL = 'MOVIE_UPDATE_FAIL';
export const REVIEW_CREATE_SUCCESS = 'REVIEW_CREATE_SUCCESS';
export const REVIEW_CREATE_FAIL = 'REVIEW_CREATE_FAIL';
export const MOVIE_DELETE_SUCCESS = 'MOVIE_DELETE_SUCCESS';
export const MOVIE_DELETE_FAIL = 'MOVIE_DELETE_FAIL';

export const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080';

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

function SuccessResonse(response){
    return{
        type : LOGIN_SUCCESS,
        payload : response
    }
}

function ErrorResonse(response){
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
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    return (dispatch) => {
        const request = axios(`${api}/reviews/`,{
            method: 'post',
            mode: 'no-cors',
            redirect: 'follow',
            withCredentials: false,
            headers: headers,
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
                dispatch(SuccessResonse(response.data));
            }else{
                dispatch(ErrorResonse(response));
            }
        })
        .catch(function (error) {
            dispatch(ErrorResonse(error));
        });
    }  
    
}

export function GetLoggedInUser(UserDetails){
   var userId = localStorage.getItem('userId');
    return (dispatch) => {
        axios({
            method:'get',
            url: `${api}/users/`+userId,
            headers: {'Accept': 'application/json', 'Authorization' :localStorage.getItem('Authorization')}
        })
        .then((response) => {
            if(response.status == 200){
                console.log("gettt"+response);
                dispatch(SuccessResonse(response.data));
            }else{
                dispatch(ErrorResonse(response));
            }
        })
        .catch(function (error) {
            dispatch(ErrorResonse(error));
        });
    }  
}

export function CreateUser(UserDetails){
    var headers = new Headers();
    headers.append('Accept', 'application/json');
   
    return (dispatch) => {
        axios({
            method:'post',
            url: `${api}/users`,
            headers: {'Accept': 'application/json'},
            data: UserDetails
        })
        .then((response) => {
            if(response.status == 200){
                console.log("putttt"+response);
                dispatch(SuccessResonse(response));
            }else{
                dispatch(ErrorResonse(response));
            }
        })
        .catch(function (error) {
            dispatch(ErrorResonse(error));
        });
    }  
}

export function UpdateUser(UserDetails){
 
    return (dispatch) => {
        axios({
            method:'put',
            url: `${api}/users/xhNR3jq33rh3ZS2dvutRi62wFBaJCg`,
            headers: {'Accept': 'application/json', 'Authorization' :localStorage.getItem('Authorization')},
            data: UserDetails
        })
        .then((response) => {
            if(response.status == 200){
                dispatch(SuccessResonse(response));
            }else{
                dispatch(ErrorResonse(response));
            }
        })
        .catch(function (error) {
            dispatch(ErrorResonse(error));
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
                dispatch(SuccessResonse(response));
            }else{
                dispatch(ErrorResonse(response));
            }
        })
        .catch(function (error) {
            dispatch(ErrorResonse(error));
        });
    }  
}


