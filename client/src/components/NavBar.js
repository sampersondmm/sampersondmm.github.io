import React, {Component} from 'react';
import {Navbar, Nav, NavDropdown,Form, FormControl, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import logo from '../images/newLogo.png'

class NavBar extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand> 
                    <img className='logo' src={logo}/>
                </Navbar.Brand>
                <Navbar.Brand> 
                    <Link className='button-link' to='/'>Box Canvas</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link>
                        <Link className='button-link' to='/'>Home</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link className='button-link' to='/canvas/new'>New Canvas</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link className='button-link' to='/'>Help</Link>
                    </Nav.Link>
                    </Nav>


                    {/* Right Navigation */}
                    <Nav inline >
                        <Nav.Link>
                            <Link className='button-link' to='/'>Account</Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link className='button-link' to='/login'>Sign Out</Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBar;