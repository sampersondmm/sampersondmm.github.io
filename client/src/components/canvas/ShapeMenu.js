import React, {Component} from 'react';
import {connect} from 'react-redux';
import ColorPicker from './ColorPicker';
import Common from '../../constants/common';
import PanelButton from './PanelButton';
import Size from '../../constants/size';
import {changeShapeColor, changeShapeType, changeShapeWidth, changeShapeHeight, changeShapeRadius, selectShape, changeBackgroundColor} from '../../actions/canvasActions';
import map from 'lodash/map';
import {MenuTypes} from './BaseMenu';
import TooltipPositions from '../../constants/tooltips';

class ShapeMenu extends Component {
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
        this.toggleShapeType = this.toggleShapeType.bind(this);
        this.changeDimensions = this.changeDimensions.bind(this);
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
    toggleShapeType(type){
        this.props.dispatch(changeShapeType(type))
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
    displayShape(style){
        return <div style={style.shapeDisplay}></div>
    }
    renderPalette(){
        return map(this.props.colorPalette, item => {
            return <div className='color-menu-color-palette-item' style={{backgroundColor: item.color}}></div>
        });
    }
    changeDimensions(attribute, plus){
        if(attribute === Common.width){
            const newWidth = plus ? this.props.shapeWidth + 5 : this.props.shapeWidth - 5;
            this.props.dispatch(changeShapeWidth(newWidth))
        }
        if(attribute === Common.height){
            const newHeight = plus ? this.props.shapeHeight + 5 : this.props.shapeHeight - 5;
            this.props.dispatch(changeShapeHeight(newHeight))
        }
        if(attribute === Common.radius){
            const newRadius = plus ? this.props.shapeRadius + 5 : this.props.shapeRadius - 5;
            this.props.dispatch(changeShapeRadius(newRadius))
        }
    }
    render(){
        const style = {
            main: {
                width: `${Size.sidePanelMenuWidth}px`,
                left: `${Size.sidePanelWidth}px`,
            },
            display: {
                backgroundColor: `${this.props.backgroundColor}`
            },
            shapeDisplay: {
                backgroundColor: this.props.shapeColor,
                width: '50px',
                height: '50px',
                borderRadius: this.props.shapeType === Common.square ? '0' : '50%'
            }
          };
          let color = null;
          if(this.state.status === Common.shape){
            color = this.state.dirty ? this.state.value : this.props.shapeColor;
          } else {
            color = this.state.dirty ? this.state.value : this.props.backgroundColor;
          }
        return (
            <div className='layer-menu-2' style={style.main}>
                <h3 className='layer-menu-2-title'>{this.props.name}</h3>
                <div className='layer-menu-2-display'>
                    <div className='layer-menu-2-display-inner' style={{backgroundColor: this.props.backgroundColor}}>
                        {this.displayShape(style)}
                    </div>
                </div>
                <h4 className='shape-menu-title'>{Common.type}</h4>
                <div className='shape-menu-type-display'>
                    <div 
                        className='shape-menu-type-square' 
                        style={{border: this.props.shapeType === Common.square ? '2px solid white' : 'none'}}
                        onClick={() => this.toggleShapeType(Common.square)}
                    ></div>
                    <div 
                        className='shape-menu-type-circle' 
                        style={{border: this.props.shapeType === Common.circle ? '2px solid white' : 'none'}}
                        onClick={() => this.toggleShapeType(Common.circle)}
                    ></div>
                </div>
                
                <h4 className='shape-menu-title'>{Common.color}</h4>
                <ColorPicker 
                    color={color} 
                    colorChange={this.handleColorChange}
                    shapeColor={this.props.shapeColor}
                    backgroundColor={this.props.backgroundColor}
                />
                
                <h4 className='shape-menu-title'>{Common.size}</h4>
                {this.props.shapeType === Common.square && (
                    <div className='shape-menu-size-row'>
                        <div className='shape-menu-size-label'>{Common.width}</div>
                        <div className='shape-menu-size-input-wrap'>
                            <i className="far fa-minus-circle shape-menu-size-icon" onClick={() => this.changeDimensions(Common.width, false)}></i>
                            <input className='shape-menu-size-input' value={this.props.shapeWidth}/>
                            <i className="far fa-plus-circle shape-menu-size-icon" onClick={() => this.changeDimensions(Common.width, true)}></i>
                        </div>
                    </div>
                )}
                {this.props.shapeType === Common.square && (
                    <div className='shape-menu-size-row'>
                        <div className='shape-menu-size-label'>{Common.height}</div>
                        <div className='shape-menu-size-input-wrap'>
                            <i className="far fa-minus-circle shape-menu-size-icon" onClick={() => this.changeDimensions(Common.height, false)}></i>
                            <input className='shape-menu-size-input' value={this.props.shapeHeight}/>
                            <i className="far fa-plus-circle shape-menu-size-icon" onClick={() => this.changeDimensions(Common.height, true)}></i>
                        </div>
                    </div>
                )}
                
                {this.props.shapeType === Common.circle && (
                    <div className='shape-menu-size-row'>
                        <div className='shape-menu-size-label'>{Common.radius}</div>
                        <div className='shape-menu-size-input-wrap'>
                            <i className="far fa-minus-circle shape-menu-size-icon" onClick={() => this.changeDimensions(Common.radius, false)}></i>
                            <input className='shape-menu-size-input' value={this.props.shapeRadius}/>
                            <i className="far fa-plus-circle shape-menu-size-icon" onClick={() => this.changeDimensions(Common.radius, true)}></i>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {backgroundColor, shapeWidth, shapeHeight, shapeRadius, shapeType, shapeColor, colorPalette} = state.canvas;
    return {
        ...state,
        shapeColor,
        shapeWidth,
        shapeRadius,
        shapeHeight,
        shapeType,
        backgroundColor,
        colorPalette
    }
}

export default connect(mapStateToProps)(ShapeMenu);