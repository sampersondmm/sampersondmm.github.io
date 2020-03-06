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
},
addColorToPalette = color => {
    return {
        type: ActionTypes.ADD_TO_PALETTE,
        payload: color
    }
},
removeColorFromPalette = newColorPalette => {
    return {
        type: ActionTypes.REPLACE_PALETTE,
        payload: newColorPalette
    }
};

export {setCanvasSize, changeShapeColor, changeBackgroundColor, addColorToPalette, removeColorFromPalette};