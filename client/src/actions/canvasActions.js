import ActionTypes from './ActionTypes';

const setCanvasSize = (width, height) => {
    return {
        type: ActionTypes.SET_CANVAS_SIZE,
        payload: {
            width,
            height
        }
    }
},
changeShapeColor = color => {
    return {
        type: ActionTypes.CHANGE_SHAPE_COLOR,
        payload: {
            shapeColor: color
        }
    }
},
changeBackgroundColor = color => {
    return {
        type: ActionTypes.CHANGE_BACKGROUND_COLOR,
        payload: {
            backgroundColor: color
        }
    }
};

export {setCanvasSize, changeShapeColor, changeBackgroundColor};