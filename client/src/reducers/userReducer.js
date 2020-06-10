import ActionTypes from '../actions/ActionTypes';
import isEmpty from 'lodash';

const DEFAULT_STATE = {
    isAuthenticated: false,
    user: {}
}

const userReducer = (state = DEFAULT_STATE, action) => {
    const {type, payload} = action,
        result = payload || {},
        isAuthenticated = !!Object.keys(result).length;
    switch(type){
        case ActionTypes.SET_CURRENT_USER:
            return {
                isAuthenticated,
                user: result
            }
        default: 
            return state;
    }
}

export default userReducer;