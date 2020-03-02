import React, {Component} from 'react';

class BottomPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        let {isOpen} = this.state;
        this.setState(state => ({
            ...state, 
            isOpen: !isOpen
        }))
    }
    render() {
        return (
            <div className={this.state.isOpen ? 'bottom-panel-open' : 'bottom-panel'}> 
                {this.state.isOpen && (
                    <div className='bottom-panel-display'>
                        <div className='bottom-panel-display-main'></div>
                    </div>
                )} 

                <div className={this.state.isOpen ? 'expand-open' : 'expand'} onClick={() => this.handleClick()}>   
                    <i className={this.state.isOpen ? "fal fa-arrow-alt-to-bottom panel-button" : "fal fa-arrow-alt-from-bottom panel-button"}></i>
                </div> 
            </div>
        )
    }
}

export default BottomPanel;