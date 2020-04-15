import React, {Component} from 'react';
import BaseMenu, { MenuTypes } from '../BaseMenu';
import {connect} from 'react-redux';
import ColorPicker from '../ColorPicker';
import Common from '../../../constants/common';
import {Button, InputGroup, Form, FormControl} from 'react-bootstrap';
import Size from '../../../constants/size';
import {setCanvasSize} from '../../../actions/canvasActions';
import BaseTopMenu from './BaseTopMenu';
import ActionTypes from '../../../actions/ActionTypes';

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
        this.applyChanges = this.applyChanges.bind(this);
    }
    componentWillReceiveProps(nextProps){
        let {width, height} = this.state;
        if(nextProps.canvasWidth !== this.props.canvasWidth){
            width = nextProps.canvasWidth
        } 
        if(nextProps.canvasHeight !== this.props.canvasHeight){
            height = nextProps.canvasHeight;
        }
        this.setState(state => ({
            ...state,
            width,
            height
        }))
    }
    applyChanges(width, height){
        const widthResult = Number(width),
            heightResult = Number(height);
        this.props.closeMenu();
        this.props.dispatch(setCanvasSize(widthResult, heightResult));
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
        const {width, height} = this.state, 
            style = {
                main: {
                    width: Size.sidePanelMenuWidth
                },
            };
        return (
            <div className='top-panel-menu-body'>
                <h3 className='top-menu-title'>{Common.size}</h3>
                <div className='size-menu-display'>
                    <div style={style.shape}></div>
                </div>
                <Form>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className='top-menu-label'>Width</Form.Label>
                        <Form.Control onChange={event => this.onChange(event, 'width')} type="number" value={width || this.props.canvasWidth} placeholder="Width" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className='top-menu-label'>Height</Form.Label>
                        <Form.Control onChange={event => this.onChange(event, 'height')} type="number" value={height || this.props.canvasHeight} placeholder="Height" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check className='top-menu-label' type="checkbox" label="Use Default" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check className='top-menu-label' type="checkbox" label="Fit to Screen" />
                    </Form.Group>
                </Form>
                <Button className='button' active={false} variant="primary" onClick={() => this.applyChanges(width || this.props.canvasWidth, height || this.props.canvasHeight)} type="submit">
                    Apply
                </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const {backgroundColor, shapeColor, canvasWidth, canvasHeight} = state.canvas;
    return {
        ...state,
        shapeColor,
        canvasWidth,
        canvasHeight,
        backgroundColor
    }
}

export default connect(mapStateToProps)(SizeMenu);