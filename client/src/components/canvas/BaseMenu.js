import React, {Component} from 'react';
import Size from '../../constants/size';
import Colors from '../../constants/colors';

export const MenuConstants = {
    sideMenu: 'Side Menu'
}

class BaseMenu extends Component {
    constructor(props) {
        super(props);

        this.menuType = MenuConstants.sideMenu

        this.determinePanelType = this.determinePanelType.bind(this);
        this.renderSidePanel = this.renderSidePanel.bind(this);
    }
    getAdditionalComponents(){
        //called from child
    }
    determinePanelType(){
        switch(this.menuType){
            case MenuConstants.sideMenu:
                return this.renderSidePanel();
            default:
                break;
        }
    }
    renderSidePanel(){
        const style ={ 
            main: {
                left: `${Size.sidePanelWidth}px`,
                top: `${Size.sidePanelWidth}px`,
                height: `calc(100vh - ${Size.sidePanelWidth}px)`,
                width: `${Size.sideMenuWidth}px`,
                color: Colors.sideMenuGray,
                border: '2px solid red'
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
    render() {
       return this.determinePanelType();
    }
}

export default BaseMenu;