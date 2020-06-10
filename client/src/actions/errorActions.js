import ActionTypes from './ActionTypes';

const addError = error => ({
    type: ActionTypes.ADD_ERROR,
    payload: error
});

const removeError = () => ({
    type: ActionTypes.REMOVE_ERROR
});

export {addError, removeError}