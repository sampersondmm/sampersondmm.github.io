import React from 'react';
import BaseMenu from './BaseMenu';
import {connect} from 'react-redux';
import ColorPicker from './ColorPicker';
import Common from '../../constants/common';
import Size from '../../constants/size';
import {changeShapeColor, changeBackgroundColor, addColorToPalette} from '../../actions/canvasActions';
import map from 'lodash/map';

class ColorMenu extends BaseMenu {
    constructor(props){
        super(props);
        this.state = {
            status: Common.shape,
            dirty: false
        }
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleColorOptions = this.handleColorOptions.bind(this);
        this.addToPalette = this.addToPalette.bind(this);
        this.renderPalette = this.renderPalette.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.colorPalette !== this.props.colorPalette){
            this.renderPalette(nextProps.colorPalette);
        }
    }   
    handleColorOptions(value){
        this.setState(state => ({
            ...state,
            status: value,
            dirty: false
        }))
    }
    handleColorChange(value, color) {
        if(this.state.status === Common.shape){
            this.props.dispatch(changeShapeColor(color));
        } else {
            this.props.dispatch(changeBackgroundColor(color));
        }
        this.setState(state => ({
            ...state, 
            dirty: true,
            value
        }));
    }
    addToPalette(){
        let {status} = this.state;
        if(status === Common.shape){
            this.props.dispatch(addColorToPalette(this.props.shapeColor));
        } else if (status === Common.background){
            this.props.dispatch(addColorToPalette(this.props.backgroundColor))
        }
    }
    renderPalette(){
        return map(this.props.colorPalette, item => {
            return <div className='color-menu-color-palette-item' style={{backgroundColor: item.color}}></div>
        });
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
          if(this.state.status === Common.shape){
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
                        onChange={() => this.handleColorOptions(Common.shape)}
                        checked={this.state.status === Common.shape}
                        className='color-menu-option-input'
                    />
                    <div className='color-menu-option-label'>{Common.shape}</div>
                </div>
                <div className='color-menu-option-wrap'>
                    <input
                        type='radio'
                        onChange={() => this.handleColorOptions(Common.background)}
                        checked={this.state.status === Common.background}
                        className='color-menu-option-input'
                    />
                    <div  
                        className='color-menu-option-label'
                    >{Common.background}</div>
                </div>
                <ColorPicker 
                    color={color} 
                    colorChange={this.handleColorChange}
                    shapeColor={this.props.shapeColor}
                    backgroundColor={this.props.backgroundColor}
                />
                <div className='color-menu-color-palette-display'>
                    {this.renderPalette()}
                </div>
                <i onClick={this.addToPalette} className="far fa-palette color-menu-palette-icon"></i>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {backgroundColor, shapeColor, colorPalette} = state.canvas;
    return {
        ...state,
        shapeColor,
        backgroundColor,
        colorPalette
    }
}

export default connect(mapStateToProps)(ColorMenu);