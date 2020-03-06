import React, {Component} from 'react';
import Size from '../../constants/size';
import Colors from '../../constants/colors';

class BaseMenu extends Component {
    constructor(props) {
        super(props);
    }
    getAdditionalComponents(){
        //called from child
    }
    render() {
        const style ={ 
            main: {
                left: `${Size.sidePanelWidth-5}px`,
                color: Colors.sideMenuGray
            }
        }
        return (
            <div className='side-panel-menu' style={style.main}>
                <div className='side-panel-icon'>
                    <i className="fal fa-window-close panel-button" onClick={this.props.closeMenu}></i>
                </div>
                {this.getAdditionalComponents()}
            </div>
        )
    }
}

export default BaseMenu;