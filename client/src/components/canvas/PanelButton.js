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
        this.handleTooltipEvents = this.handleTooltipEvents.bind(this);
    }
    handleHover(isHover) {
        this.setState(state => ({
            ...state,
            hover: isHover
        }))
    }
    handleTooltipEvents(e){
        e.stopPropagation();
        this.handleHover(false)
    }
    handleClick(){
        this.props.controlMenu(this.props.name, this.props.position);
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
        return !this.props.exit ? 
        (
            <div 
                className='panel-button'
                id='panel-button'
                onMouseEnter={() => this.handleHover(true)} 
                onMouseLeave={() => this.handleHover(false)}
                onClick={this.handleClick}
            >
                {this.props.icon}
                {this.state.hover && (
                    <div 
                        className={tooltipClass}
                        onMouseEnter={this.handleTooltipEvents}
                        onMouseLeave={this.handleTooltipEvents}
                    >{this.props.name}</div>
                )}
            </div>
        ):
        (
            <Link 
                className='panel-button'
                style={{color: 'white', textDecoration: 'none'}}
                onMouseEnter={() => this.handleHover(true)} 
                onMouseLeave={() => this.handleHover(false)}
                to='/'
            >
                {this.props.icon}
                {this.state.hover && (
                    <div 
                        className={tooltipClass}
                    >{this.props.name}</div>
                )}
            </Link>
        ) 
    }
}

export default PanelButton;