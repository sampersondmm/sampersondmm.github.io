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
                <div className='expand' onClick={() => this.handleClick()}>   
                    <i className={this.state.isOpen ? "fal fa-arrow-alt-from-bottom" : "fal fa-arrow-alt-to-bottom"}></i>
                </div> 
            </div>
        )
    }
}

export default BottomPanel;