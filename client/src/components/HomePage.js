import React, {Component} from 'react';
import NavBar from './NavBar';
import {fetchCanvasList} from '../actions/canvasActions';
import {connect} from 'react-redux';
import {apiCall} from '../actions/api';
import CanvasList from './CanvasList';

class HomePage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className='homepage'>
                <NavBar/>
                <div className='homepage-body'>
                    <CanvasList />
                </div>
            </div>
        )
    }
}

export default HomePage