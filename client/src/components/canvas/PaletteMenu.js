import React from 'react';
import BaseMenu from './BaseMenu';
import {connect} from 'react-redux';
import ColorPicker from './ColorPicker';
import Common from '../../constants/common';
import {changeShapeColor, changeBackgroundColor, addColorToPalette, removeColorFromPalette} from '../../actions/canvasActions';
import map from 'lodash/map';
import reject from 'lodash/reject';
import uuid from 'react-uuid';

class PaletteMenu extends BaseMenu {
    constructor(props){
        super(props);
        this.state = {
            currentColor: 'rgb(80,80,80)',
            addColorPicker: false,
            value: 'rgb(80,80,80)',
            activeItem: null,
        }
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleColorOptions = this.handleColorOptions.bind(this);
        this.completeColorChange = this.completeColorChange.bind(this);
        this.addToPalette = this.addToPalette.bind(this);
        this.renderPalette = this.renderPalette.bind(this);
        this.selectPaletteColor = this.selectPaletteColor.bind(this);
        this.addColorPicker = this.addColorPicker.bind(this);
        this.removeColor = this.removeColor.bind(this);
        this.emptyPalette = this.emptyPalette.bind(this);
    }
    componentDidMount(){
        const color = this.props.colorPalette[0].color;
        this.setState(state => ({
            ...state,
            activeItem: this.props.colorPalette[0].uuid,
            currentColor: color,
            value: color
        }));
    }
    componentWillReceiveProps(nextProps){
        let {activeItem, removeDisabled, emptyDisabled, currentColor, value} = this.state;
        if(nextProps.colorPalette !== this.props.colorPalette){
            this.renderPalette(nextProps.colorPalette);
            activeItem = nextProps.colorPalette.length ? nextProps.colorPalette[0].uuid : null;
            removeDisabled = !nextProps.colorPalette.length;
            emptyDisabled = !nextProps.colorPalette.length;

        }
        this.setState(state => ({
            ...state,
            activeItem,
            removeDisabled,
            emptyDisabled,
            currentColor,
            value
        }))
    }   
    handleColorOptions(value){
        this.setState(state => ({
            ...state,
            status: value,
            dirty: false
        }))
    }
    handleColorChange(value, color) {
        this.setState(state => ({
            ...state, 
            currentColor: color,
            value,
        }));
    }
    addToPalette(){
        let {currentColor} = this.state;
        this.props.dispatch(addColorToPalette(currentColor));
    }
    removeColor(){
        const {activeItem} = this.state,
            newColorPalette = reject(this.props.colorPalette, ['uuid', activeItem]);
        this.props.dispatch(removeColorFromPalette(newColorPalette));
    }
    emptyPalette(){
        this.props.dispatch(removeColorFromPalette([]));
    }
    addColorPicker(){
        let {addColorPicker} = this.state;
        this.setState(state => ({
            ...state,
            addColorPicker: !addColorPicker
        }))
    }
    selectPaletteColor(item){
        let {currentColor, value} = this.state;
        this.setState(state => ({
            ...state,
            currentColor: item.color,
            value: item.color,
            activeItem: item.uuid
        }));
    }
    renderPalette(){
        const {activeItem} = this.state;
        return map(this.props.colorPalette, item => {
            const isActive = true,
                style = {
                    backgroundColor: item.color,
                    border: activeItem === item.uuid ? '1px solid rgb(200,200,200)' : 'none'
                };
            return (
                <div 
                    key={item.uuid}
                    onClick={() => this.selectPaletteColor(item)} 
                    className='color-menu-color-palette-item' 
                    style={style}
                />
            )
        });
    }
    completeColorChange(value){
        let color = null;
        if(this.state.status === Common.shape){
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
        const {currentColor, value, removeDisabled, emptyDisabled} = this.state,
            style = {
                display: {
                    backgroundColor: currentColor
                },
            };
        return (
            <div className='side-panel-content'>
                <h3 className='side-panel-title'>{this.props.name}</h3>
                <div className='palette-menu-display' style={style.display}></div>
                <div className='color-menu-color-palette-display'>
                    {this.renderPalette()}
                </div>
                <div onClick={this.addColorPicker} className='inner-menu-icon-wrap'>
                    <i className="fal fa-plus inner-menu-icon"></i>
                    <div className='inner-menu-icon-label'>Add to Palette</div>
                </div>
                {this.state.addColorPicker && (
                    <ColorPicker 
                        color={value} 
                        colorChange={this.handleColorChange}
                        shapeColor={this.props.shapeColor}
                        backgroundColor={this.props.backgroundColor}
                        applyColorChange={this.addToPalette}
                    />)}
                <div onClick={removeDisabled ? null : this.removeColor} className='inner-menu-icon-wrap'>
                    <i className="fal fa-minus inner-menu-icon"></i>
                    <div className='inner-menu-icon-label'>Remove Palette Color</div>
                </div>
                <div onClick={emptyDisabled ? null : this.emptyPalette} className='inner-menu-icon-wrap'>
                    <i className="fal fa-trash inner-menu-icon"></i>
                    <div className='inner-menu-icon-label'>Empty Palette</div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    const {backgroundColor, shapeColor, colorPalette} = state.canvas;
    return {
        ...state,
        colorPalette
    }
}

export default connect(mapStateToProps)(PaletteMenu);