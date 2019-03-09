import {SET_CURRET_USER} from '../actionTypes';

const DEFAULT_STATE = {
    user:{},
    isAuthenticated:false   
}

export default (state = DEFAULT_STATE,action) => {
    switch (action.type) {
        case SET_CURRET_USER:
        return {
            isAuthenticated:!!Object.keys(action.user).length,
            user:action.user
        }
        break;
    
        default:
            return state;
    }
}
