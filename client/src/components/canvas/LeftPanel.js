import React, {Component} from 'react';
import {connect} from 'react-redux';
import Common from '../../constants/common';
import PanelButton from './PanelButton';
import ShapeMenu from './ShapeMenu';
import SetupCanvas from './SetupCanvas';
import {setCanvasSize} from '../../actions/canvasActions';
import TooltipPositions from '../../constants/tooltips';

class LeftPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            setup: false,
            selectShape: false
        }
        this.controlMenu = this.controlMenu.bind(this);
        this.setCanvasSize = this.setCanvasSize.bind(this);
        this.handleMenus = this.handleMenus.bind(this);
    }
    controlMenu(value){
        this.setState(state => ({   
            ...state,
            isOpen: value 
        }))
    }
    handleMenus(){
        this.props.handleMenu();
    }
    handleShapeSelection(select){
        this.setState(state => ({
            ...state,
            selectShape: select
        }))
    }
    setCanvasSize(width, height){
        this.props.dispatch(setCanvasSize(Number(width), Number(height)))
        this.setState(state => ({
            ...state,
            setup: false,
            canvasWidth: width ? width : this.props.width,
            canvasHeight: height ? height : this.props.height
         }))
    }
    render(){
        return (
            <div className='left-panel'>

                {this.props.isOpen && (
                    <ShapeMenu
                        shapeList={this.props.shapeList}
                    />
                )}
                <PanelButton 
                    name={'Add New Shape'}
                    type={Common.sidePanel}
                    tooltipPosition={TooltipPositions.left}
                    onClick={() => this.handleShapeSelection(false)}
                    icon={<i className="fal fa-plus-circle"></i>}
                />
                <PanelButton 
                    name={'Select Shape'}
                    type={Common.sidePanel}
                    tooltipPosition={TooltipPositions.left}
                    onClick={() => this.handleShapeSelection(true)}
                    icon={<i className="fal fa-mouse-pointer"></i>}
                />
                <PanelButton 
                    name={Common.shapes}
                    type={Common.sidePanel}
                    tooltipPosition={TooltipPositions.left}
                    onClick={this.handleMenus}
                    icon={<i className="fal fa-shapes"></i>}
                />
            </div>
        )
    }
}

const mapStateToProps= (state) => {
    const {backgroundColor, shapeColor, shapeList, width, height} = state.canvas
    return {
        ...state,
        backgroundColor,
        shapeColor,
        shapeList,
        width,
        height
    }
}

export default connect(mapStateToProps)(LeftPanel);