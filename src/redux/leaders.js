// import { LEADERS } from '../shared/leaders';
import * as ActionTypes from './ActionTypes';


export const Leaders = (state = {isLoading:true, errMessage:null,leaders:[]}, action) => {
        switch(action.type){
            case ActionTypes.ADD_LEADERS:
                return {...state, isLoading:false, errMessage:null, leaders:action.payload};
    
            case ActionTypes.LEADERS_FAILED:
                return {...state, isLoading:false, errMessage:action.payload, leaders:[]};
    
            case ActionTypes.LEADERS_LOADING:
                return {...state, isLoading:true, errMessage:null, leaders:[]};
        default:
            return state;
    }
};