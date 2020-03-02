import React from 'react';
import BaseMenu from './BaseMenu';
import {connect} from 'react-redux';
import ColorPicker from './ColorPicker';
import Common from '../../constants/common';
import {Button, InputGroup, FormControl} from 'react-bootstrap';
import Size from '../../constants/size';
import {changeShapeColor, changeBackgroundColor} from '../../actions/canvasActions';

class ColorMenu extends BaseMenu {
    constructor(props){
        super(props);
        this.state = {
            status: 'shape',
            dirty: false
        }
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleColorOptions = this.handleColorOptions.bind(this);
        this.completeColorChange = this.completeColorChange.bind(this);
    }
    handleColorOptions(value){
        this.setState(state => ({
            ...state,
            status: value,
            dirty: false
        }))
    }
    handleColorChange(value, color) {
        if(this.state.status === 'shape'){
            this.props.dispatch(changeShapeColor(color));
        } else {
            this.props.dispatch(changeBackgroundColor(color));
        }
        this.setState(state => ({
            ...state, 
            dirty: true,
            value
        }))
    }
    completeColorChange(value){
        let color = null;
        if(this.state.status === 'shape'){
            this.props.dispatch(changeShapeColor(color));
        } else {
            this.props.dispatch(changeBackgroundColor(value));
        }
        this.setState(state => ({
            ...state, 
            dirty: true,
            value
        }))
    }
    getAdditionalComponents(){
        const style = {
            main: {
                width: Size.sidePanelMenuWidth
            },
            display: {
                backgroundColor: `${this.props.backgroundColor}`
            },
            shape: {
                width: '50%',
                height: '50%',
                backgroundColor: `${this.props.shapeColor}`
            }
          };
          let color = null;
          if(this.state.status === 'shape'){
            color = this.state.dirty ? this.state.value : this.props.shapeColor;
          } else {
            color = this.state.dirty ? this.state.value : this.props.backgroundColor;
          }
        return (
            <div className='side-panel-content'>
                <h3 className='side-panel-title'>{this.props.name}</h3>
                <div className='color-menu-display' style={style.display}>
                    <div style={style.shape}></div>
                </div>
                <div className='color-menu-option-wrap'>
                    <input
                        type='radio'
                        onChange={() => this.handleColorOptions('shape')}
                        checked={this.state.status === 'shape'}
                        className='color-menu-option-input'
                    />
                    <div className='color-menu-option-label'>{Common.shape}</div>
                </div>
                <div className='color-menu-option-wrap'>
                    <input
                        type='radio'
                        onChange={() => this.handleColorOptions('background')}
                        checked={this.state.status === 'background'}
                        className='color-menu-option-input'
                    />
                    <div  
                        className='color-menu-option-label'
                    >{Common.background}</div>
                </div>
                <ColorPicker 
                    color={color} 
                    colorChange={this.handleColorChange}
                    completeColorChange={this.completeColorChange}
                    shapeColor={this.props.shapeColor}
                    backgroundColor={this.props.backgroundColor}
                />
                <div className='color-menu-color-palette-display'>
                    <div className='color-menu-color-palette-item'></div>
                    <div className='color-menu-color-palette-item'></div>
                    <div className='color-menu-color-palette-item'></div>
                </div>
                <i className="far fa-palette color-menu-palette-icon"></i>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {backgroundColor, shapeColor} = state.canvas;
    return {
        ...state,
        shapeColor,
        backgroundColor
    }
}

export default connect(mapStateToProps)(ColorMenu);