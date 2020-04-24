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
addShapeToCanvas = newShape => {
    return {
        type: ActionTypes.ADD_SHAPE_TO_CANVAS,
        payload: {
            newShape, 
        }
    }
},
changeCanvasScale = scale => {
    return {
        type: ActionTypes.CHANGE_CANVAS_SCALE,
        payload: {
            canvasScale: scale
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
selectShape = (itemId) => {
    return {
        type: ActionTypes.SELECT_SHAPE,
        payload: itemId
    }
},
removeColorFromPalette = newColorPalette => {
    return {
        type: ActionTypes.REPLACE_PALETTE,
        payload: newColorPalette
    }
};

export {setCanvasSize, addShapeToCanvas, changeShapeType, changeShapeColor, changeShapeWidth, changeCanvasScale, changeShapeHeight, changeShapeRadius, selectShape, changeBackgroundColor, addColorToPalette, removeColorFromPalette};