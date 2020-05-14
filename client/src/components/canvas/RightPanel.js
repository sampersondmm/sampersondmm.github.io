import React, {Component} from 'react';
import {connect} from 'react-redux';
import Common from '../../constants/common';
import PanelButton from './PanelButton';
import LayerMenu from './LayerMenu';
import SetupCanvas from './SetupCanvas';
import {setCanvasSize} from '../../actions/canvasActions';
import TooltipPositions from '../../constants/tooltips';

class RightPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            setup: false
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
            <div className='right-panel'>
                
                    {this.props.isOpen && (
                        <LayerMenu
                            shapeList={this.props.shapeList}
                        />
                    )}

                    {this.state.setup && (
                        <SetupCanvas apply={this.setCanvasSize}/>
                    )}

                    <PanelButton 
                        name={Common.layers}
                        type={Common.sidePanel}
                        tooltipPosition={TooltipPositions.right}
                        onClick={this.handleMenus}
                        icon={<i className="fal fa-layer-group"></i>}
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

export default connect(mapStateToProps)(RightPanel);