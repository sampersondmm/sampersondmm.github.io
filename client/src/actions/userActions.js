import ActionTypes from './ActionTypes';
import {apiCall, setTokenHeader} from './api';
import {addError, removeError} from './errorActions';

const authorizeUser = (type, userData) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('post', `/api/auth/${type}`, userData)
            .then(({token, ...user}) => {
                sessionStorage.setItem('jwtToken', token);
                setAuthorizationToken(token)
                dispatch(setCurrentUser(user));
                dispatch(removeError());
                resolve();
            })
            .catch(err => {
                dispatch(addError(err.message));
                reject();
            })
        })
    }
}

const setAuthorizationToken = token => {
    setTokenHeader(token)
}

const logoutUser = () => {
    return dispatch => {
        sessionStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}))
    }
}

const setCurrentUser = user => {
    return {
        type: ActionTypes.SET_CURRENT_USER,
        payload: user
    }
}

export {setCurrentUser, authorizeUser, logoutUser, setAuthorizationToken};