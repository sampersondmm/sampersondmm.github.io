import ActionTypes from "../actions/ActionTypes";
import uuid from 'react-uuid';

const DEFAULT_STATE = {
  width: 800,
  height: 800,
  backgroundColor: 'rgb(30,30,40)',
  shapeColor: 'rgb(200,200,230)',
  colorPalette: [
    {color: "#4771e8", uuid: "50ecc8b-23f5-dc2f-e06d-15e01b437a0"},
    {color: "#af56d8", uuid: "4dc6017-71d3-1b5-0067-4017bbe66efd"},
    {color: "#5b2175", uuid: "55fa65b-b05-e446-d0f-77757824e5"},
    {color: "#cd5b5b", uuid: "b24323-3bc0-1671-c67e-53823dac62"}
  ]
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
    case ActionTypes.ADD_TO_PALETTE:
      return {
        ...state,
        colorPalette: [{color: payload, uuid: uuid()}, ...state.colorPalette]
      }
    case ActionTypes.REPLACE_PALETTE:
      return {
        ...state,
        colorPalette: payload
      }
    default:
      return state;
  }
}

export default sidePanel;