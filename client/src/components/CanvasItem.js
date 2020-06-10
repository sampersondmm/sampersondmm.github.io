import React, {Component} from 'react';
import {select} from 'd3-selection';
import Common from '../constants/common';
import filter from 'lodash/filter';
import reverse from 'lodash/reverse';

class CanvasItem extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        this.setupCanvas();
    }
    setupCanvas(){
        const shapeList = this.props.canvasData.shapeList,
            rectArr = reverse(filter(shapeList, ['type', Common.square])),
            circleArr = reverse(filter(shapeList, ['type', Common.circle]));

        select(this.node)
            .selectAll('rect')
            .data(rectArr)
            .enter()
            .append('rect')
            .attr('fill', obj => obj.color)
            .attr('width', obj => obj.width)
            .attr('height', obj => obj.height)
            .attr('x', obj => obj.posX)
            .attr('y', obj => obj.posY)
            .attr('transform', obj => obj.transform);
        
        select(this.node)
            .selectAll('circle')
            .data(circleArr)
            .enter()
            .append('circle')
            .attr('class', 'shape')
            .attr('fill', obj => obj.color)
            .attr('r', obj => obj.radius)
            .attr('cx', obj => obj.posX)
            .attr('cy', obj => obj.posY);
    }
    render(){
        const style = {
            backgroundColor: this.props.canvasData.backgroundColor,
            width: `${this.props.canvasData.canvasWidth}px`,
            height: `${this.props.canvasData.canvasHeight}px`
        }
        return (
            <svg className='canvas-item' style={style} ref={node => (this.node = node)}/>
        )
    }
}


export default CanvasItem;