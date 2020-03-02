import React from 'react';
import BaseMenu from './BaseMenu';
import {connect} from 'react-redux';
import ColorPicker from './ColorPicker';
import Common from '../../constants/common';
import {Button, InputGroup, Form, FormControl} from 'react-bootstrap';
import Size from '../../constants/size';
import {changeShapeColor, changeBackgroundColor} from '../../actions/canvasActions';

class SizeMenu extends BaseMenu {
    constructor(props){
        super(props);
        this.state = {
            status: 'shape',
            width: null,
            height: null,
            dirty: false
        }
        this.onChange = this.onChange.bind(this);
    }
    componentWillReceiveProps(nextProps){
        let {width, height} = this.state;
        if(nextProps.width !== this.props.width){
            width = nextProps.width
        } 
        if(nextProps.height !== this.props.height){
            height = nextProps.height;
        }
        this.setState(state => ({
            ...state,
            width,
            height
        }))
    }
    onChange(event, type){
        const {value} = event.target;
        let {width, height} = this.state;
        if(type === 'width'){
            width = value;
        } else {
            height = value;
        }
        this.setState(state => ({
            ...state,
            width,
            height
        }))
    }
    getAdditionalComponents(){
        let color = null;
        const style = {
            main: {
                width: Size.sidePanelMenuWidth
            },
            display: {
            },
            shape: {
                width: '50%',
                height: '50%',
                backgroundColor: `${this.props.backgroundColor}`
            }
          },
          width = this.state.width ? this.state.width : this.props.width,
          height = this.state.height ? this.state.height : this.props.height;

          if(this.state.status === 'shape'){
            color = this.state.dirty ? this.state.value : this.props.shapeColor;
          } else {
            color = this.state.dirty ? this.state.value : this.props.backgroundColor;
          }
        return (
            <div className='side-panel-content'>
                <h3 className='side-panel-title'>{this.props.name}</h3>
                <div className='size-menu-display'>
                    <div style={style.shape}></div>
                </div>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className='setup-canvas-label'>Width</Form.Label>
                        <Form.Control onChange={event => this.onChange(event, 'width')} type="number" value={width} placeholder="Width" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className='setup-canvas-label'>Height</Form.Label>
                        <Form.Control onChange={event => this.onChange(event, 'height')} type="number" value={height} placeholder="Height" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check className='setup-canvas-label' type="checkbox" label="Use Default" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check className='setup-canvas-label' type="checkbox" label="Fit to Screen" />
                    </Form.Group>
                </Form>
                <Button className='button'variant="primary" onClick={() => this.props.apply(width, height, false)}type="submit">
                    Apply
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {backgroundColor, shapeColor, width, height} = state.canvas;
    return {
        ...state,
        shapeColor,
        width,
        height,
        backgroundColor
    }
}

export default connect(mapStateToProps)(SizeMenu);