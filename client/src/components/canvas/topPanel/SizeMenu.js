import React, {Component} from 'react';
import BaseMenu, { MenuTypes } from '../BaseMenu';
import {connect} from 'react-redux';
import ColorPicker from '../ColorPicker';
import Common from '../../../constants/common';
import {Button, InputGroup, Form, FormControl} from 'react-bootstrap';
import Size from '../../../constants/size';
import {changeShapeColor, changeBackgroundColor} from '../../../actions/canvasActions';
import BaseTopMenu from './BaseTopMenu';

class SizeMenu extends Component {
    constructor(props){
        super(props);
        this.menuType = MenuTypes.topMenu
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
    render(){
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
            <div className='top-panel-menu-body'>
                <h3 className='top-menu-title'>{Common.size}</h3>
                <div className='size-menu-display'>
                    <div style={style.shape}></div>
                </div>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className='top-menu-label'>Width</Form.Label>
                        <Form.Control onChange={event => this.onChange(event, 'width')} type="number" value={width} placeholder="Width" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className='top-menu-label'>Height</Form.Label>
                        <Form.Control onChange={event => this.onChange(event, 'height')} type="number" value={height} placeholder="Height" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check className='top-menu-label' type="checkbox" label="Use Default" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check className='top-menu-label' type="checkbox" label="Fit to Screen" />
                    </Form.Group>
                </Form>
                <Button className='button' active={false} variant="primary" onClick={() => this.props.apply(width, height, false)} type="submit">
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