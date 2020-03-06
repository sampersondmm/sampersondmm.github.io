import React, {Component} from 'react'
import {CustomPicker} from 'react-color'
import {EditableInput, Hue, Alpha, Saturation, Checkboard} from 'react-color/lib/components/common'
import Size from '../../constants/size';

class ColorPicker extends Component {
    render(){
        const style = {
            shape: {
                width: '50%',
                height: '50%',
                backgroundColor: `${this.props.hex}`
            }
          };
          return (
            <div className='color-picker-wrap'>
                <div className='color-picker-saturation'>
                  <Saturation 
                    {...this.props} 
                    onChange={event => this.props.colorChange(event, this.props.hex)}
                    // onChangeComplete={this.props.completeColorChange}
                />
                </div>
                <div className='color-picker-hue'>
                  <Hue 
                    {...this.props} 
                    onChange={event => this.props.colorChange(event, this.props.hex)}
                    // onChangeComplete={this.props.completeColorChange} 
                />
                </div>
                <div  className='color-picker-alpha'>
                    <Checkboard/>
                  <Alpha 
                    {...this.props} 
                    onChange={event => this.props.colorChange(event, this.props.hex)}
                    // onChangeComplete={this.props.completeColorChange}
                />
                </div>
                {this.props.applyColorChange && (
                    <div className='color-picker-bottom'>
                        <i onClick={() => this.props.applyColorChange(this.props.hex)} className="fal fa-check color-picker-icon"></i>
                    </div>
                )}
            </div>
          )
    }
}

export default CustomPicker(ColorPicker)