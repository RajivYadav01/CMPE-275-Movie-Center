import * as actionTypes from './actions';


const initialState = {
    msg : '',
    status : ''
}

const reducer = (state = initialState, action) => {
    console.log("Action : ", action.payload);
    switch(action.type){
        case actionTypes.MOVIE_CREATE_SUCCESS:
            return{
                ...state,
                msg : action.payload.msg,
                status : action.type
            }
        case actionTypes.MOVIE_CREATE_FAIL:
            console.log("Movie Create Failed");
            return{
                ...state,
                msg : action.payload.msg,
                status : action.type
            }
        case actionTypes.REVIEW_CREATE_SUCCESS:
            return{
                ...state,
                msg : action.payload.msg,
                status : action.type
            }
        case actionTypes.REVIEW_CREATE_FAIL:
            console.log("Movie Create Failed");
            return{
                ...state,
                msg : action.payload.msg
            }
        case actionTypes.LOGIN_SUCCESS:
            console.log("Login Success : ", action.payload.data);
            return{
                ...state,
                msg : action.payload,
                status : action.type
            }
        case actionTypes.LOGIN_ERROR:
            return{
                ...state,
                msg : action.payload,
                status : action.type
            }
        case actionTypes.USER_SUCCESS:
            return{
                ...state,
                msg : action.payload,
                status : action.type
            }
        case actionTypes.USER_ERROR:
            return{
                ...state,
                msg : action.payload,
                status : action.type
            }
        case actionTypes.MOVIE_UPDATE_SUCCESS:
            return{
                ...state,
                msg : action.payload,
                status : action.type
            }
        case actionTypes.MOVIE_UPDATE_FAIL:
            return{
                ...state,
                msg : action.payload,
                status : action.type
            }
            case actionTypes.MOVIE_DELETE_SUCCESS:
            console.log("Movie Delete : ", action.payload);
            return{
                ...state,
                msg : action.payload,
                status : action.type
            }
        case actionTypes.MOVIE_DELETE_FAIL:
            return{
                ...state,
                msg : action.payload,
                status : action.type
            }
        case actionTypes.USER_UPDATE_SUCCESS:
            return{
                ...state,
                msg : action.payload,
                status : action.type
            }
        case actionTypes.USER_UPDATE_ERROR:
            return{
                ...state,
                msg : action.payload,
                status : action.type
            }
        }
       
    
    return state;
}

export default reducer;