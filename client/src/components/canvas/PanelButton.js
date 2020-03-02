import React, {Component} from 'react';
import Common from '../../constants/common';
import {Link} from 'react-router-dom';

class PanelButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            hover: false,
            class: 'panel-button'
        }

        this.handleHover = this.handleHover.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    handleHover(isHover) {
        this.setState(state => ({
            ...state,
            hover: isHover
        }))
    }
    handleClick(name){
        let {active} = this.state;
        this.setState(state => ({
            ...state,
            active: true,
            isOpen: 'panel-button-active'
        }))
    }
    render(){
        return this.props.exit ? (
            <Link 
                className={this.state.hover ? 'panel-button-active' : 'panel-button'}
                style={{color: 'white', textDecoration: 'none'}}
                onMouseEnter={() => this.handleHover(true)} 
                onMouseLeave={() => this.handleHover(false)}
                to='/'
            >
                {this.props.icon}
                {this.state.hover && (
                    <div className='panel-tooltip'>{this.props.name}</div>
                )}
            </Link>
        ) :
        (
            <div 
            className={this.state.hover ? 'panel-button-active' : 'panel-button'}
                onMouseEnter={() => this.handleHover(true)} 
                onMouseLeave={() => this.handleHover(false)}
                onClick={() => this.props.handleClick(this.props.name)}  
            >
                {this.props.icon}
                {this.state.hover && (
                    <div className='panel-tooltip'>{this.props.name}</div>
                )}
            </div>
        )
    }
}

export default PanelButton;