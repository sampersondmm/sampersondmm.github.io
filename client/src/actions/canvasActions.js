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
changeShapeWidth = width => {
    return {
        type: ActionTypes.CHANGE_SHAPE_WIDTH,
        payload: {
            shapeWidth: width
        }
    }
},
changeShapeHeight = height => {
    return {
        type: ActionTypes.CHANGE_SHAPE_HEIGHT,
        payload: {
            shapeHeight: height
        }
    }
},
changeShapeRadius = radius => {
    return {
        type: ActionTypes.CHANGE_SHAPE_RADIUS,
        payload: {
            shapeRadius: radius
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

export {setCanvasSize, changeShapeType, changeShapeColor, changeShapeWidth, changeShapeHeight, changeShapeRadius, changeBackgroundColor, addColorToPalette, removeColorFromPalette};