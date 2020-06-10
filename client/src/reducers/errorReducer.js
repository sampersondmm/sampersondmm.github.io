import ActionTypes from '../actions/ActionTypes';

const DEFAULT_STATE = {
    message: null
};

const errorReducer = (state = DEFAULT_STATE, action) => {
    const {type, payload} = action,
        result = payload || {};
    switch(type) {
        case ActionTypes.ADD_ERROR:
            const newState = {...state, message: payload}
            return newState;
        case ActionTypes.REMOVE_ERROR:
            return {...state, message: null};
        default:
            return state;
    }
}

export default errorReducer;