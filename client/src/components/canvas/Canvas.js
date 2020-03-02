import React, {Component} from 'react';
import {connect} from 'react-redux';
import SidePanel from './SidePanel';
import BottomPanel from './BottomPanel';
import TopPanel from './TopPanel';
import Size from '../../constants/size';
import CircleCanvas from './CanvasAnimation'

class Canvas extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const style = {
            main: {
                width: `${this.props.width}px`,
                height: `${this.props.height}px`
            }
        }
        return(
            <div className='canvas-wrap'>
                <SidePanel/>
                <div className='canvas-display' style={{width: `calc(${Size.sidePanelWidth} - 100vw)`}}>
                    <TopPanel/>
                        <CircleCanvas 
                            width={this.props.width}
                            height={this.props.height}
                            backgroundColor={this.props.backgroundColor}
                            shapeColor={this.props.shapeColor}
                        />
                    <BottomPanel/>
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