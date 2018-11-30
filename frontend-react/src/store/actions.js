import axios from 'axios';
// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory();

export const MOVIE_CREATE_SUCCESS = 'MOVIE_CREATE_SUCCESS';
export const MOVIE_CREATE_FAIL = 'MOVIE_CREATE_FAIL';

export const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8080';

function MovieCreateSuccess(response){
    console.log("Response in Success : ", response);
    return{
        type : MOVIE_CREATE_SUCCESS,
        payload : response.data
    }
}

function MovieCreateFailed(response){
    console.log("Response in Fail : ", response);
    return{
        type : MOVIE_CREATE_FAIL,
        payload : response.data
    }
}
export function CreateMovie(MovieDetails){
    var headers = new Headers();
    headers.append('Accept', 'application/json');
    return (dispatch) => {
        const request = axios(`${api}/admin/create_movie`,{
            method: 'post',
            mode: 'no-cors',
            redirect: 'follow',
            withCredentials: true,
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


