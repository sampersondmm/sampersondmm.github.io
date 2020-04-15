import React, {Component} from 'react';
import BaseMenu from '../BaseMenu';
import {connect} from 'react-redux';
import ColorPicker from '../ColorPicker';
import Common from '../../../constants/common';
import Size from '../../../constants/size';
import {changeShapeColor, changeShapeType, changeBackgroundColor} from '../../../actions/canvasActions';
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
                        <h3 className='shape-menu-title'>{Common.type}</h3>
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
                        <h3 className='shape-menu-title'>{Common.size}</h3>
                        <div className='shape-menu-type-display' style={{backgroundColor: this.props.backgroundColor}}>
                            <div 
                                className={this.props.shapeType === Common.square ? 'shape-menu-type-square' : 'shape-menu-type-circle'} 
                                style={style.shape}
                                onClick={() => this.toggleShapeType(Common.square)}
                            ></div>
                        </div>
                    </Tab>
                    <Tab    
                        eventKey={Common.rotation} 
                        title={Common.rotation}
                        className='shape-menu-tabs' 
                    >
                        <h3 className='shape-menu-title'>{Common.rotation}</h3>
                    </Tab>
                    <Tab 
                        eventKey={Common.border} 
                        title={Common.border}
                        className='shape-menu-tabs' 
                    >
                        <h3 className='shape-menu-title'>{Common.border}</h3>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {backgroundColor, shapeColor, shapeType, colorPalette} = state.canvas;
    return {
        ...state,
        shapeColor,
        backgroundColor,
        shapeType,
        colorPalette
    }
}

export default connect(mapStateToProps)(ShapeMenu);

// <div className='color-menu-display' style={style.display}>
//                     <div style={style.shape}></div>
//                 </div>
//                 <div className='color-menu-option-wrap'>
//                     <input
//                         type='radio'
//                         onChange={() => this.handleColorOptions(Common.shape)}
//                         checked={this.state.status === Common.shape}
//                         className='color-menu-option-input'
//                     />
//                     <div className='color-menu-option-label'>{Common.shape}</div>
//                 </div>
//                 <div className='color-menu-option-wrap'>
//                     <input
//                         type='radio'
//                         onChange={() => this.handleColorOptions(Common.background)}
//                         checked={this.state.status === Common.background}
//                         className='color-menu-option-input'
//                     />
//                     <div  
//                         className='color-menu-option-label'
//                     >{Common.background}</div>
//                 </div>
//                 <ColorPicker 
//                     color={color} 
//                     colorChange={this.handleColorChange}
//                     shapeColor={this.props.shapeColor}
//                     backgroundColor={this.props.backgroundColor}
//                 />
//                 <div className='color-menu-color-palette-display'>
//                     {this.renderPalette()}
//                 </div>