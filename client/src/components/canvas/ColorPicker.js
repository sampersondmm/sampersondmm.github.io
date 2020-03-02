import React, {Component} from 'react'
import {CustomPicker} from 'react-color'
import {EditableInput, Hue, Alpha, Saturation, Checkboard} from 'react-color/lib/components/common'
import Size from '../../constants/size';

class ColorPicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            hex: this.props.hex,
            hsl: this.props.hsl,
            color: `rgb(${this.props.hsl.h}, ${this.props.hsl.s}, ${this.props.hsl.l}, ${this.props.hsl.a})`
        }
    }
    render(){
        const style = {
            main: {
                width: Size.sidePanelMenuWidth
            },
            shape: {
                width: '50%',
                height: '50%',
                backgroundColor: `${this.props.hex}`
            }
          };
          return (
            <div style={style.main}>
                <div className='color-menu-saturation'>
                  <Saturation 
                    {...this.props} 
                    onChange={event => this.props.colorChange(event, this.props.hex)}
                    onChangeComplete={this.props.completeColorChange}
                />
                </div>
                <div className='color-menu-hue'>
                  <Hue 
                    {...this.props} 
                    onChange={event => this.props.colorChange(event, this.props.hex)}
                    onChangeComplete={this.props.completeColorChange} 
                />
                </div>
                <div  className='color-menu-alpha'>
                    <Checkboard/>
                  <Alpha 
                    {...this.props} 
                    onChange={event => this.props.colorChange(event, this.props.hex)}
                    onChangeComplete={this.props.completeColorChange}
                />
                </div>
            </div>
          )
    }
}

export default CustomPicker(ColorPicker)