import React, {Component} from 'react';
import {connect} from 'react-redux';
import Common from '../../../constants/common';
import PanelButton from '../PanelButton';
import ColorMenu from './ColorMenu';
import PaletteMenu from './PaletteMenu';
import SizeMenu from './SizeMenu';
import ZoomMenu from '../ZoomMenu';
import SetupCanvas from '../SetupCanvas';
import {setCanvasSize} from '../../../actions/canvasActions';
import logo from '../../../images/newLogo.png';
import TooltipPositions from '../../../constants/tooltips';
import BaseTopMenu from './BaseTopMenu';

class TopPanel extends Component {
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
    controlMenu(value, position){
        this.setState(state => ({   
            ...state,
            isOpen: value, 
            position
        }))
    }
    closeMenu(){
        this.setState(state => ({
            ...state,
            isOpen: false
        }))
    }
    handleMenus(){
        switch(this.state.isOpen){
            case Common.color:
                return (
                    <BaseTopMenu
                        name={Common.color}
                        position={this.state.position}
                        closeMenu={this.closeMenu}
                    />
                )
            case Common.size:
                return (
                    <BaseTopMenu
                        name={Common.size}
                        position={this.state.position}
                        closeMenu={this.closeMenu}
                    />
                )
            case Common.palette:
                return (
                    <BaseTopMenu
                        name={Common.palette}
                        position={this.state.position}
                        closeMenu={this.closeMenu}
                    />
                )
            case Common.palette:
                return (
                    <PaletteMenu
                        name={Common.palette}
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
            <div className='top-panel'>
                <div className='top-panel-left'>
                    <img src={logo} className='top-panel-logo'/>

                    {this.handleMenus()}


                    <PanelButton 
                        name={Common.size}
                        tooltipPosition={TooltipPositions.bottom}
                        controlMenu={this.controlMenu}
                        position={0}
                        icon={<i className="far fa-expand-arrows"></i>}
                    />
                    <PanelButton 
                        name={Common.shape}
                        tooltipPosition={TooltipPositions.bottom}
                        controlMenu={this.controlMenu}
                        position={1}
                        icon={<i className="far fa-shapes"></i>}
                    />
                    <PanelButton 
                        name={Common.color}
                        tooltipPosition={TooltipPositions.bottom}
                        controlMenu={this.controlMenu}
                        position={2}
                        icon={<i className="far fa-fill"></i>}
                    />
                    <PanelButton 
                        name={Common.palette}
                        tooltipPosition={TooltipPositions.bottom}
                        controlMenu={this.controlMenu}
                        position={3}
                        icon={<i className="far fa-palette"></i>}
                    />
                    <PanelButton 
                        name={Common.zoom}
                        tooltipPosition={TooltipPositions.bottom}
                        controlMenu={this.controlMenu}
                        position={4}
                        icon={<i className="far fa-search-plus"></i>}
                    />
                </div>

                <div className='top-panel-right'>
                    <PanelButton 
                        name={Common.clear}
                        position={5}
                        icon={<i className="far fa-trash"></i>}
                    />
                    <PanelButton 
                        name={Common.save}
                        position={6}
                        icon={<i className="far fa-download"></i>}
                    />
                    <PanelButton 
                        name={Common.exit} 
                        position={7}
                        exit={true}
                        icon={<i className="far fa-portal-exit"></i>}
                    />
                </div>
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

export default connect(mapStateToProps)(TopPanel);