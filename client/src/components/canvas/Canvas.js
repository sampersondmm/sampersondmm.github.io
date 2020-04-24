import React, {Component} from 'react';
import {connect} from 'react-redux';
import RightPanel from './RightPanel';
import LeftPanel from './LeftPanel';
import TopPanel from './topPanel/TopPanel';
import Size from '../../constants/size';
import ShapeCanvas from './topPanel/ShapeCanvas'
import { addShapeToCanvas } from '../../actions/canvasActions';

class Canvas extends Component {
    constructor(props){
        super(props);
        this.state = {
            rightPanelOpen: true,
            leftPanelOpen: false
        }
        this.handleRightMenu = this.handleRightMenu.bind(this);
        this.handleLeftMenu = this.handleLeftMenu.bind(this);
        this.addShape = this.addShape.bind(this);
        this.determineWidth = this.determineWidth.bind(this);
    }
    handleRightMenu(){
        this.setState(state => ({
            ...state,
            rightPanelOpen: !state.rightPanelOpen
        }))
    }
    handleLeftMenu(){
        this.setState(state => ({
            ...state,
            leftPanelOpen: !state.leftPanelOpen
        }))
    }
    addShape(newShape){
        this.props.dispatch(addShapeToCanvas(newShape))
    }
    determineWidth(){
        const {rightPanelOpen, leftPanelOpen} = this.state;
        let width = null;
        if(rightPanelOpen && !leftPanelOpen){
            width = (Size.sidePanelWidth*2) + Size.sidePanelMenuWidth;
        }
        if(!rightPanelOpen && leftPanelOpen){
            width = (Size.sidePanelWidth*2)+ Size.sidePanelMenuWidth;
        }
        if(!rightPanelOpen && !leftPanelOpen){
            width =  Size.sidePanelWidth * 2;
        } 
        if(rightPanelOpen && leftPanelOpen){
            width = (Size.sidePanelWidth + Size.sidePanelMenuWidth) * 2;
        }
        return width;
    }
    render(){
        const width = this.determineWidth(),
            style = {
                canvasDisplay: {
                    height: `calc(100vh - ${Size.topPanelHeight}px)`,
                },
                canvasDisplayInner: {
                    width: `calc(100vw - ${width}px)`,
                    height: `calc(100vh - ${Size.topPanelHeight}px)`,
                    left: `${this.state.leftPanelOpen ? Size.sidePanelWidth + Size.sidePanelMenuWidth : Size.sidePanelWidth}px`,
                    top: '0'
                }
            }
        return(
            <div className='canvas-wrap'>
                <TopPanel/>
                <div className='canvas-display' style={style.canvasDisplay}>
                    <LeftPanel
                        handleMenu={this.handleLeftMenu}
                        isOpen={this.state.leftPanelOpen}
                    />
                    <div className='canvas-display-inner' style={style.canvasDisplayInner}>
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
                            selectedShape={this.props.selectedShape}
                        />
                    </div>
                    <RightPanel
                        handleMenu={this.handleRightMenu}
                        isOpen={this.state.rightPanelOpen}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {canvasWidth, canvasScale, selectedShape, canvasHeight, backgroundColor, shapeType, shapeWidth, shapeHeight, shapeRadius, shapeColor} = state.canvas;
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
        selectedShape,
        shapeType,
    }
}

export default connect(mapStateToProps)(Canvas);