import React, {Component} from 'react';
import {event, select} from 'd3-selection';
import Common from '../../../constants/common';

export default class ShapeCanvas extends Component {
    /**
     * Creates an instance of the Canvas
     *
     * @param {object.<string, any>} props The props.
     */
    constructor(props) {
        super(props);
        this.backgroundColor = this.props.backgroundColor;
        // this.circleColor = 'rgb(100,120,120)';
        this.circleColor = this.props.shapeColor;
        this.speedConst = 0.5;
        this.particleCount = 150;
        this.connectionDistance = 100;
        this.shapeArr = [];
        this.currentShape = {};
        this.lines = [];
        this.posX = 100; 
        this.posY = 100;

        this.state = {
            posX: 100,
            posY: 100,
        };
        this.canvasEl = null;
        this.particles = [];
        this.buildCanvas = this.buildCanvas.bind(this);
        this.addShape = this.addShape.bind(this);
        this.changeShapeColor = this.changeShapeColor.bind(this);
        this.changeShapeType = this.changeShapeType.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const {canvasWidth, canvasHeight, shapeType, shapeColor} = nextProps;
        if(shapeColor !== this.props.shapeColor){
            this.changeShapeColor(shapeColor)
        }
        if(shapeType !== this.props.shapeType){
            this.changeShapeType(shapeType)
        }
    }

    /**
     * Update the state based on the props.
     *
     * @returns {void}
     */
    componentDidMount() {
        this.setState(state => ({
            ...state,
            shapeColor: this.props.shapeColor,
            backgroundColor: this.props.backgroundColor
        }));
        window.addEventListener('resize', this.resize);
        this.buildCanvas();
    }

    moveShape(){
        const canvasElement = document.getElementById('canvas').getBoundingClientRect();
        const node = select(this.node)
            .select('.stamp');

        let shapeWidth = null,
            shapeHeight = null;


        if(this.props.shapeType === Common.square){
            shapeWidth = node.attr('width'); 
            shapeHeight = node.attr('height'); 

            select(this.node)
                .select('.stamp')
                .attr('x', () => event.x - canvasElement.left)
                .attr('y', () => event.y - canvasElement.top)
                this.currentShape.posX = event.x - canvasElement.left - (shapeWidth/2);
                this.currentShape.posY = event.y - canvasElement.top - (shapeHeight/2);
        } else {
            select(this.node)
                .select('.stamp')
                .attr('cx', () => event.x - canvasElement.left)
                .attr('cy', () => event.y - canvasElement.top)
                this.currentShape.posX = event.x - canvasElement.left;
                this.currentShape.posY = event.y - canvasElement.top;
        }
    }

    buildCanvas(){
        this.currentShape = {
            width: this.props.shapeWidth,
            height: this.props.shapeHeight,
            posX: 100, 
            posY: 100,
            type: Common.square,
            color: this.props.shapeColor
        };
        select(this.node)
            .selectAll('rect')
            .data([this.currentShape])
            .enter()
            .append('rect')
            .attr('class', 'stamp')
            .attr('fill', obj => obj.color)
            .attr('width', obj => obj.width)
            .attr('height', obj => obj.height)
            .attr('x', obj => obj.posX)
            .attr('y', obj => obj.posY)
            .attr('transform', obj => `translate(-${obj.width / 2}, -${obj.height / 2})`)

        select(this.node)
            .on('mousemove', () => this.moveShape())
            .on('click', (obj, index, arr) => this.addShape(index, arr))
    }

    addShape(){
        this.shapeArr.push({...this.currentShape});
        
        if(this.props.shapeType === Common.square){
            select(this.node)
                .selectAll('.shape')
                .data(this.shapeArr)
                .enter()
                .append('rect')
                .attr('class', 'shape')
                .attr('fill', obj => obj.color)
                .attr('width', obj => obj.width)
                .attr('height', obj => obj.height)
                .attr('x', obj => obj.posX)
                .attr('y', obj => obj.posY)
        } else {
            select(this.node)
                .selectAll('.shape')
                .data(this.shapeArr)
                .enter()
                .append('circle')
                .attr('class', 'shape')
                .attr('fill', obj => obj.color)
                .attr('r', obj => obj.radius)
                .attr('cx', obj => obj.posX)
                .attr('cy', obj => obj.posY)
        }
    }

    changeShapeColor(newColor){
        select(this.node)
            .selectAll('.stamp')
            .attr('fill', newColor)
        this.currentShape.color = newColor;
    }

    changeShapeType(newType){
        select(this.node)
            .selectAll('.stamp')
            .remove()

        delete this.currentShape['radius']
        delete this.currentShape['width']
        delete this.currentShape['height']

        if(newType === Common.square){
            this.currentShape = {
                ...this.currentShape,
                width: this.props.shapeWidth,
                height: this.props.shapeHeight,
                type: Common.square
            }

            select(this.node)
                .selectAll('.stamp')
                .data([this.currentShape])
                .enter()
                .append('rect')
                .attr('class', 'stamp')
                .attr('fill', obj => obj.color)
                .attr('width', obj => obj.width)
                .attr('height', obj => obj.height)
                .attr('x', obj => obj.posX)
                .attr('y', obj => obj.posY)
                .attr('transform', obj => `translate(-${obj.width / 2}, -${obj.height / 2})`)

        } else {
            this.currentShape = {
                ...this.currentShape,
                radius: this.props.shapeRadius,
                type: Common.circle
            }

            select(this.node)
                .selectAll('.stamp')
                .data([this.currentShape])
                .enter()
                .append('circle')
                .attr('class', 'stamp')
                .attr('fill', obj => obj.color)
                .attr('r', obj => obj.radius)
                .attr('cx', obj => obj.posX)
                .attr('cy', obj => obj.posY)
        }
    }

    render() {
        const {canvasWidth, canvasHeight} = this.props;
        const style = {
            main: {
                width: `${canvasWidth}px`,
                height: `${canvasHeight}px`,
                backgroundColor: this.props.backgroundColor,
                position: 'relative'
            }
        }
        return (
            <svg style={style.main} id='canvas' ref={node => (this.node = node)}/>
        );
    }
}



