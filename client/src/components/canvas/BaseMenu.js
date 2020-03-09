import React, {Component} from 'react';
import Size from '../../constants/size';
import Colors from '../../constants/colors';

export const MenuTypes = {
    sideMenu: 'sideMenu',
    topMenu: 'topMenu'
}

class BaseMenu extends Component {
    constructor(props) {
        super(props);

        this.menuType = MenuTypes.sideMenu

        this.determinePanelType = this.determinePanelType.bind(this);
        this.renderSidePanel = this.renderSidePanel.bind(this);
        this.renderTopPanel = this.renderTopPanel.bind(this);
    }
    getAdditionalComponents(){
        //called from child
    }
    determinePanelType(){
        switch(this.menuType){
            case MenuTypes.sideMenu:
                return this.renderSidePanel();
            case MenuTypes.topMenu:
                return this.renderTopPanel();
            default:
                break;
        }
    }
    renderTopPanel(){
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
                    <div className='top-panel-icon' onClick={this.props.closeMenu}>
                        <i className="fal fa-window-close panel-button"></i>
                    </div>
                </div>
                {this.getAdditionalComponents()}
            </div>
        )
    }
    renderSidePanel(){
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
            <div className='side-panel-menu' style={style.main}>
                <div className='side-panel-icon'>
                    <i className="fal fa-window-close panel-button"></i>
                </div>
                {this.getAdditionalComponents()}
            </div>
        )
    }
    render() {
       return this.determinePanelType();
    }
}

export default BaseMenu;