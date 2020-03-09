import React, {Component} from 'react';
import Common from '../../constants/common';
import {Link} from 'react-router-dom';
import TooltipPositions from '../../constants/tooltips';

class PanelButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            hover: false,
            class: 'panel-button'
        }

        this.handleHover = this.handleHover.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.displayMenu = this.displayMenu.bind(this);
    }
    handleHover(isHover) {
        this.setState(state => ({
            ...state,
            hover: isHover
        }))
    }
    handleClick(){
        this.props.onClick(this.props.name);
    }
    displayMenu(){
        if(this.props.isOpen === this.props.name){
            return this.props.menu
        }
    }
    render(){
        let tooltipClass = '';
        switch(this.props.tooltipPosition){
            case TooltipPositions.bottom:
                tooltipClass = 'panel-tooltip-bottom';
                break;
            default:
                tooltipClass = 'panel-tooltip';
                break 
        }
        return this.props.exit ? (
            <Link 
                className='panel-button'
                style={{color: 'white', textDecoration: 'none'}}
                onMouseEnter={() => this.handleHover(true)} 
                onMouseLeave={() => this.handleHover(false)}
                to='/'
            >
                {this.props.icon}
                {this.state.hover && (
                    <div className={tooltipClass}>{this.props.name}</div>
                )}
            </Link>
        ) :
        (
            <div 
                className='panel-button'
                onMouseEnter={() => this.handleHover(true)} 
                onMouseLeave={() => this.handleHover(false)}
                onClick={() => this.handleClick(true)}
            >
                {this.props.icon}
                {this.state.hover && (
                    <div className={tooltipClass}>{this.props.name}</div>
                )}
            </div>
        )
    }
}

export default PanelButton;