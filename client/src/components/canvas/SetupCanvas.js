import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';

class SetupCanvas extends Component {
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            width: 0,
            height: 0,
        }
    }
    onChange(event, key){
        let {width, height} = this.state;
        const value = event.target.value;
        switch(key){
            case 'width':
                width = value;
                break;
            case 'height':
                height = value;
                break;  
            default:
                break;
        }
        this.setState(state => ({
            ...state,
            width,
            height
        }));
    }
    render(){
        return (
            <div className='setup-canvas'>
                <div className='setup-canvas-content'>
                    <div className='setup-canvas-top'></div>
                    <div className='setup-canvas-display'>
                        <div className='setup-canvas-display-left'>
                            <div className='setup-canvas-model'></div>
                        </div>
                        <div className='setup-canvas-display-right'>
                            <div className='setup-canvas-form'>

                                <Form>
                                    <h4 className='setup-canvas-title'>Set Canvas Dimensions</h4>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label className='setup-canvas-label'>Width</Form.Label>
                                        <Form.Control onChange={event => this.onChange(event, 'width')} type="number" placeholder="Width" />
                                    </Form.Group>

                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label className='setup-canvas-label'>Height</Form.Label>
                                        <Form.Control onChange={event => this.onChange(event, 'height')} type="number" placeholder="Height" />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check className='setup-canvas-label' type="checkbox" label="Use Default" />
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className='setup-canvas-bottom'>
                        <Button className='button'variant="primary" onClick={() => this.props.apply(this.state.width, this.state.height, false)}type="submit">
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SetupCanvas;