import * as actionTypes from './actions';


const initialState = {
    msg : ''
}

const reducer = (state = initialState, action) => {
    console.log("Action : ", action.payload);
    switch(action.type){
        case actionTypes.MOVIE_CREATE_SUCCESS:
            return{
                ...state,
                msg : action.payload.msg
            }
        case actionTypes.MOVIE_CREATE_FAIL:
            console.log("Movie Create Failed");
            return{
                ...state,
                msg : action.payload.msg
            }
        }
    
    return state;
}

export default reducer;