import ActionTypes from "../actions/ActionTypes";

// import ACTION_TYPES from '../actionTypes';

const DEFAULT_STATE = {
  width: 800,
  height: 800,
  backgroundColor: 'rgb(30,30,40)',
  shapeColor: 'rgb(200,200,230)'
}

const sidePanel = (state = DEFAULT_STATE, action = {}) => {
  const {type, payload} = action,
    result = payload || {};
  switch(type){
    case ActionTypes.SET_CANVAS_SIZE:
      return {
        ...state,
        width: payload.width,
        height: payload.height 
      }
    case ActionTypes.CHANGE_SHAPE_COLOR:
      return {
        ...state,
        shapeColor: payload.shapeColor
      }
    case ActionTypes.CHANGE_BACKGROUND_COLOR:
      return {
        ...state,
        backgroundColor: payload.backgroundColor
      }
    default:
      return state;
  }
}

export default sidePanel;