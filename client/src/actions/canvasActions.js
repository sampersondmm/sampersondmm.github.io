import ActionTypes from './ActionTypes';

const setCanvasSize = (canvasWidth, canvasHeight) => {
    return {
        type: ActionTypes.SET_CANVAS_SIZE,
        payload: {
            canvasWidth,
            canvasHeight
        }
    }
},
changeShapeType = type => {
    return {
        type: ActionTypes.CHANGE_SHAPE_TYPE,
        payload: {
            shapeType: type
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

export {setCanvasSize, changeShapeType, changeShapeColor, changeBackgroundColor, addColorToPalette, removeColorFromPalette};