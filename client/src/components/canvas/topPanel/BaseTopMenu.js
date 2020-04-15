import React, {Component} from 'react';
import Size from '../../../constants/size';
import Colors from '../../../constants/colors';
import SizeMenu from './SizeMenu';
import ColorMenu from './ColorMenu';
import ShapeMenu from './ShapeMenu';
import PaletteMenu from './PaletteMenu';
import Common from '../../../constants/common';

export const MenuTypes = {
    sideMenu: 'sideMenu',
    topMenu: 'topMenu'
}

/**
 * Renders the individual top menu components individually. 
 * Controls which menus are open 
 */
class BaseTopMenu extends Component {
    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
    }
    handleMenus(){
        switch(this.props.name){
            case Common.size:
                return <SizeMenu closeMenu={this.props.closeMenu}/>
            case Common.shape:
                return <ShapeMenu/>
            case Common.color: 
                return <ColorMenu/>
            case Common.palette: 
                return <PaletteMenu/>
            default:
                return;
        }
    }
    handleClose(event){
        event.preventDefault();
        this.props.closeMenu()
    }
    render() {
        const leftPosition = this.props.position * 
            Size.panelButtonWidth + Size.panelButtonWidth,
            style ={ 
                main: {
                    left: `${leftPosition}px`,
                }}
        return (
            <div className='top-panel-menu' style={style.main}>
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