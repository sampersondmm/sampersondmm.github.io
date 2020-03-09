import React, {Component} from 'react';
import Size from '../../../constants/size';
import Colors from '../../../constants/colors';
import SizeMenu from './SizeMenu';

export const MenuTypes = {
    sideMenu: 'sideMenu',
    topMenu: 'topMenu'
}

class BaseTopMenu extends Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }
    handleMenus(){
        return <SizeMenu/>
    }
    handleClose(event){
        event.preventDefault();
        this.props.closeMenu()
    }
    render() {
        const style ={ 
            main: {
                left: `${Size.sidePanelWidth}px`,
                top: `${Size.sidePanelWidth}px`,
                height: `calc(100vh - ${Size.sidePanelWidth}px)`,
                width: `${Size.sideMenuWidth}px`,
                color: Colors.sideMenuGray,
            }
        }
        return (
            <div className='top-panel-menu'>
                <div className='top-panel-menu-top'>
                    <div className='top-panel-icon' onClick={this.handleClose}>
                        <i className="fal fa-window-close panel-button"></i>
                    </div>
                </div>
                {this.handleMenus()}
            </div>
        )
    }
}

export default BaseTopMenu;