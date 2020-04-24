import React, {Component} from 'react';
import BaseMenu from './BaseMenu';
import {connect} from 'react-redux';
import ColorPicker from './ColorPicker';
import Common from '../../constants/common';
import PanelButton from './PanelButton';
import Size from '../../constants/size';
import {changeShapeColor, selectShape, changeBackgroundColor} from '../../actions/canvasActions';
import map from 'lodash/map';
import {MenuTypes} from './BaseMenu';
import TooltipPositions from '../../constants/tooltips';

class LayerMenu extends Component {
    constructor(props){
        super(props);
        this.menuType = MenuTypes.sideMenu
        this.state = {
            status: Common.shape,
            dirty: false
        }
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleColorOptions = this.handleColorOptions.bind(this);
        this.renderPalette = this.renderPalette.bind(this);
        this.renderShapeList = this.renderShapeList.bind(this);
        this.displayShape = this.displayShape.bind(this);
        this.selectShape = this.selectShape.bind(this);
        this.hoverShape = this.hoverShape.bind(this);
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.colorPalette !== this.props.colorPalette){
            this.renderPalette(nextProps.colorPalette);
        }
        if(nextProps.shapeList !== this.props.shapeList){
            this.renderShapeList(nextProps.shapeList);
        }
    }   
    handleColorOptions(value){
        this.setState(state => ({
            ...state,
            status: value,
            dirty: false
        }))
    }
    hoverShape(item){
        this.props.dispatch(selectShape(item))
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
    renderShapeList(){
        return map(this.props.shapeList, item => {
            return (
                <div className='layer-menu-shape-item' onClick={() => this.selectShape(item)}>
                    <div 
                        className={item.type === Common.square ? 'layer-menu-shape-item-square' : 'layer-menu-shape-item-circle'} 
                        style={{backgroundColor: item.color}}
                    ></div>
                    <div className='layer-menu-shape-title'>{item.type}</div>
                </div>
            )
        });
    }
    selectShape(item){
        this.props.dispatch(selectShape(item.id))
    }
    displayShape(){
        return <div></div>
    }
    renderPalette(){
        return map(this.props.colorPalette, item => {
            return <div className='color-menu-color-palette-item' style={{backgroundColor: item.color}}></div>
        });
    }
    render(){
        const style = {
            main: {
                width: `${Size.sidePanelMenuWidth}px`,
                right: `${Size.sidePanelWidth}px`
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
            <div className='layer-menu' style={style.main}>
                <h3 className='layer-menu-title'>{this.props.name}</h3>
                <div className='layer-menu-display'>
                    <div className='layer-menu-display-inner' style={{backgroundColor: this.props.backgroundColor}}>
                        {this.displayShape()}
                    </div>
                </div>
                <div className='layer-menu-shapes'>
                    {this.renderShapeList()}
                </div>
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

export default connect(mapStateToProps)(LayerMenu);