import React, {Component} from 'react';
import {connect} from 'react-redux';
import Common from '../../constants/common';
import PanelButton from './PanelButton';
import ColorMenu from './ColorMenu';
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
    }
    controlMenu(value){
        this.setState(state => ({   
            ...state,
            isOpen: value 
        }))
    }
    closeMenu(){
        this.setState(state => ({
            ...state,
            isOpen: false
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
            <div className='side-panel'>
                <div>
                    {this.state.isOpen === Common.color && (
                        <ColorMenu 
                            name={Common.color}
                            isOpen={this.state.isOpen === Common.color} 
                            closeMenu={this.closeMenu} 
                        />
                    )}
                    {this.state.isOpen === Common.size && (
                        <SizeMenu 
                            name={Common.size}
                            isOpen={this.state.isOpen === Common.size}
                            width={this.props.width} 
                            height={this.props.height} 
                            apply={this.setCanvasSize}
                            closeMenu={this.closeMenu} 
                        />
                    )}
                    {this.state.isOpen === Common.zoom && (
                        <ZoomMenu isOpen={this.state.isOpen === Common.zoom} closeMenu={this.closeMenu} color={'rgb(200,200,200)'}/>
                    )}
                    {this.state.setup && (
                        <SetupCanvas apply={this.setCanvasSize}/>
                    )}

                    <PanelButton 
                        name={Common.size}
                        handleClick={this.controlMenu}
                        icon={<i className="far fa-expand-arrows"></i>}
                    />
                    <PanelButton 
                        name={Common.shape}
                        icon={<i className="far fa-shapes"></i>}
                    />
                    <PanelButton 
                        name={Common.color}
                        handleClick={this.controlMenu}
                        icon={<i className="far fa-fill"></i>}
                    />
                    <PanelButton 
                        name={Common.palette}
                        handleClick={this.controlMenu}
                        icon={<i className="far fa-palette"></i>}
                    />
                    <PanelButton 
                        name={Common.zoom}
                        icon={<i className="far fa-search-plus"></i>}
                    />
                </div>

                <div>
                    <PanelButton 
                        name={Common.clear}
                        icon={<i className="far fa-trash"></i>}
                    />
                    <PanelButton 
                        name={Common.save}
                        icon={<i className="far fa-download"></i>}
                    />
                    <PanelButton 
                        name={Common.exit} 
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

export default connect(mapStateToProps)(SidePanel);