import React, {Component} from 'react';
import {connect} from 'react-redux';
import Common from '../../constants/common';
import PanelButton from './PanelButton';
import LayerMenu from './LayerMenu';
import PaletteMenu from './PaletteMenu';
import SizeMenu from './SizeMenu';
import ZoomMenu from './ZoomMenu';
import SetupCanvas from './SetupCanvas';
import {setCanvasSize} from '../../actions/canvasActions';

class SidePanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            setup: false
        }
        this.controlMenu = this.controlMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.setCanvasSize = this.setCanvasSize.bind(this);
        this.handleMenus = this.handleMenus.bind(this);
    }
    controlMenu(value){
        this.setState(state => ({   
            ...state,
            isOpen: value 
        }))
    }
    closeMenu(){
        this.props.handleMenu(false)
        this.setState(state => ({
            ...state,
            isOpen: false
        }))
    }
    handleMenus(){
        switch(this.state.isOpen){
            case Common.layers:
                this.props.handleMenu(true);
                return (
                    <LayerMenu 
                        name={Common.layers}
                        closeMenu={this.closeMenu} 
                    />
                )
            default:
                return null;
        }
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
            <div className='side-panel'>
                
                    {this.handleMenus()}

                    {this.state.setup && (
                        <SetupCanvas apply={this.setCanvasSize}/>
                    )}

                    <PanelButton 
                        name={Common.layers}
                        handleClick={this.controlMenu}
                        icon={<i className="fal fa-layer-group"></i>}
                    />
            </div>
        )
    }
}

const mapStateToProps= (state) => {
    const {backgroundColor, shapeColor, width, height} = state.canvas
    return {
        ...state,
        backgroundColor,
        shapeColor,
        width,
        height
    }
}

export default connect(mapStateToProps)(SidePanel);