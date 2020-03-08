import React, {Component} from 'react';
import {connect} from 'react-redux';
import SidePanel from './SidePanel';
import TopPanel from './TopPanel';
import Size from '../../constants/size';
import ShapeCanvas from './ShapeCanvas'
// import CircleCanvas from './CanvasAnimation'

class Canvas extends Component {
    constructor(props){
        super(props);
        this.state = {
            sidePanelOpen: false
        }
        this.handleSideMenu = this.handleSideMenu.bind(this);
    }
    handleSideMenu(open){
        this.setState(state => ({
            ...state,
            sidePanelOpen: open
        }))
    }
    render(){
        const width = this.state.sidePanelOpen ? 
            Size.sidePanelWidth + Size.sideMenuWidth : 
            Size.sidePanelWidth,
            style = {
                canvasDisplay: {
                    width: `calc(100vw - ${width}px)`,
                    height: `calc(100vh - ${Size.topPanelWidth}px)`,
                }
            }
        return(
            <div className='canvas-wrap'>
                <TopPanel/>
                <div className='canvas-display'>
                    <SidePanel
                        handleMenu={this.handleSideMenu}
                    />
                    <div className='canvas-display-inner' style={style.canvasDisplay}>
                        <ShapeCanvas 
                            width={this.props.width}
                            height={this.props.height}
                            backgroundColor={this.props.backgroundColor}
                            shapeColor={this.props.shapeColor}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {width, height, backgroundColor, shapeColor} = state.canvas;
    return {
        ...state,
        width,
        height,
        backgroundColor,
        shapeColor,
    }
}

export default connect(mapStateToProps)(Canvas);