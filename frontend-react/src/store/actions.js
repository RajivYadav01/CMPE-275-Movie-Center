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
        const request = axios(`${api}/update_movie/${movieID}`,{
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
                localStorage.setItem("Authorization", response.headers["authorization"]);
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

export function CreateUser(UserDetails){
    var headers = new Headers();
    headers.append('Accept', 'application/json');
   
    return (dispatch) => {
        axios({
            method:'post',
            url: `${api}/users`,
            headers: headers,
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


