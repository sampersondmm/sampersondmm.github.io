import React, {Component} from 'react';
import {connect} from 'react-redux';
import SidePanel from './SidePanel';
import TopPanel from './topPanel/TopPanel';
import Size from '../../constants/size';
import ShapeCanvas from './topPanel/ShapeCanvas'
import { addShapeToCanvas } from '../../actions/canvasActions';
// import CircleCanvas from './CanvasAnimation'

class Canvas extends Component {
    constructor(props){
        super(props);
        this.state = {
            sidePanelOpen: true
        }
        this.handleSideMenu = this.handleSideMenu.bind(this);
        this.addShape = this.addShape.bind(this);
    }
    handleSideMenu(open){
        this.setState(state => ({
            ...state,
            sidePanelOpen: open
        }))
    }
    addShape(newShape){
        this.props.dispatch(addShapeToCanvas(newShape))
    }
    render(){
        const width = this.state.sidePanelOpen ? 
            Size.sidePanelWidth + Size.sidePanelMenuWidth : 
            Size.sidePanelWidth,
            style = {
                canvasDisplay: {
                    width: `calc(100vw - ${width}px)`,
                    height: `calc(100vh - ${Size.topPanelHeight}px)`,
                }
            }
        return(
            <div className='canvas-wrap'>
                <TopPanel/>
                <div className='canvas-display'>
                    <div className='canvas-display-inner' style={style.canvasDisplay}>
                        <ShapeCanvas 
                            canvasWidth={this.props.canvasWidth}
                            canvasHeight={this.props.canvasHeight}
                            canvasScale={this.props.canvasScale}
                            backgroundColor={this.props.backgroundColor}
                            shapeColor={this.props.shapeColor}
                            shapeType={this.props.shapeType}
                            shapeWidth={this.props.shapeWidth}
                            shapeHeight={this.props.shapeHeight}
                            shapeRadius={this.props.shapeRadius}
                            addShape={this.addShape}
                        />
                    </div>
                    <SidePanel
                        handleMenu={this.handleSideMenu}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {canvasWidth, canvasScale, canvasHeight, backgroundColor, shapeType, shapeWidth, shapeHeight, shapeRadius, shapeColor} = state.canvas;
    return {
        ...state,
        canvasWidth,
        canvasHeight,
        canvasScale,
        backgroundColor,
        shapeColor,
        shapeWidth,
        shapeHeight,
        shapeRadius,
        shapeType,
    }
}

export default connect(mapStateToProps)(Canvas);