import React, {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logo from '../images/newLogo.png';
import CircleCanvas from './loginAnimation'

class LoginPage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='login-page-main'>
                <CircleCanvas/>
                <div className='login-page-logo-container'>
                    <img className='login-page-logo' src={logo}/>
                    <h2 className='login-page-title'>Box Canvas</h2>
                </div>
                <Form className='login-page-wrap'>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label className='center'>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label className='center'>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <div className='buttonWrap'>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Remember Me" />
                        </Form.Group>
                        <Button className='button' variant="primary">
                            <Link to='/' className='button-link'>Submit</Link>
                        </Button>
                    </div>
                </Form>
            </div>
        )
    }
}

export default LoginPage;