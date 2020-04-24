import React, {Component} from 'react';
import BaseMenu from '../BaseMenu';
import {connect} from 'react-redux';
import Common from '../../../constants/common';
import Size from '../../../constants/size';
import {changeShapeColor, changeShapeWidth, changeShapeHeight, changeShapeRadius, changeShapeType, changeBackgroundColor} from '../../../actions/canvasActions';
import {Tabs, Tab} from 'react-bootstrap';
import map from 'lodash/map';

class ShapeMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: Common.shape,
            dirty: false
        }
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleColorOptions = this.handleColorOptions.bind(this);
        this.renderPalette = this.renderPalette.bind(this);
        this.toggleShapeType = this.toggleShapeType.bind(this);
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
    renderPalette(){
        return map(this.props.colorPalette, item => {
            return <div className='color-menu-color-palette-item' style={{backgroundColor: item.color}}></div>
        });
    }
    toggleShapeType(type){
        this.props.dispatch(changeShapeType(type))
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
                width: Size.sidePanelMenuWidth
            },
            display: {
                backgroundColor: `${this.props.backgroundColor}`
            },
            shape: {
                backgroundColor: this.props.shapeColor
            },
          };
          let color = null;
          if(this.state.status === Common.shape){
            color = this.state.dirty ? this.state.value : this.props.shapeColor;
          } else {
            color = this.state.dirty ? this.state.value : this.props.backgroundColor;
          }
        return (
            <div className='top-panel-menu-body'>
                <h3 className='top-menu-title'>{Common.shape}</h3>
                <Tabs defaultActiveKey={Common.type} className='shape-menu'>
                    <Tab 
                        eventKey={Common.type} 
                        title={Common.type}
                        className='shape-menu-tabs'
                    >
                        <h4 className='shape-menu-title'>{Common.type}</h4>
                        <div className='shape-menu-type-display' style={{backgroundColor: this.props.backgroundColor}}>
                            <div 
                                className='shape-menu-type-square' 
                                style={{...style.shape, border: this.props.shapeType === Common.square ? '2px solid white' : 'none'}}
                                onClick={() => this.toggleShapeType(Common.square)}
                            ></div>
                            <div 
                                className='shape-menu-type-circle' 
                                style={{...style.shape, border: this.props.shapeType === Common.circle ? '2px solid white' : 'none'}}
                                onClick={() => this.toggleShapeType(Common.circle)}
                            ></div>
                        </div>
                    </Tab>
                    <Tab 
                        eventKey={Common.size} 
                        title={Common.size}
                        className='shape-menu-tabs'
                    >
                        <h4 className='shape-menu-title'>{Common.size}</h4>
                        <div className='shape-menu-size'>
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
                    </Tab>
                    <Tab    
                        eventKey={Common.rotation} 
                        title={Common.rotation}
                        className='shape-menu-tabs' 
                        disabled={this.props.shapeType === Common.circle}
                    >
                        <h4 className='shape-menu-title'>{Common.rotation}</h4>
                    </Tab>
                    <Tab 
                        eventKey={Common.border} 
                        title={Common.border}
                        className='shape-menu-tabs' 
                    >
                        <h4 className='shape-menu-title'>{Common.border}</h4>
                        <div className='shape-menu-border-display' style={{backgroundColor: this.props.backgroundColor}}>
                            <div 
                                className='shape-menu-type-square' 
                                style={{...style.shape, border: this.props.shapeType === Common.square ? '2px solid white' : 'none'}}
                                onClick={() => this.toggleShapeType(Common.square)}
                            ></div>
                            <div 
                                className='shape-menu-type-circle' 
                                style={{...style.shape, border: this.props.shapeType === Common.circle ? '2px solid white' : 'none'}}
                                onClick={() => this.toggleShapeType(Common.circle)}
                            ></div>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {backgroundColor, shapeColor, shapeWidth, shapeHeight, shapeRadius, shapeType, colorPalette} = state.canvas;
    return {
        ...state,
        shapeColor,
        shapeWidth,
        shapeHeight, 
        shapeRadius,
        backgroundColor,
        shapeType,
        colorPalette
    }
}

export default connect(mapStateToProps)(ShapeMenu);

