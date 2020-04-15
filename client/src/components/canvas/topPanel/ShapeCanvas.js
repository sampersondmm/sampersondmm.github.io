import React, {Component} from 'react';
import {event, select} from 'd3-selection';

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
            speedY: 0,
            speedX: 0,
            canvasWidth: 0,
            canvasHeight: 0,
            shapeWidth: 20,
            shapeHeight: 20,
            previousCanvasWidth: 0,
            previousCanvasHeight: 0
        };
        this.canvasEl = null;
        this.particles = [];
        this.buildCanvas = this.buildCanvas.bind(this);
        this.addShape = this.addShape.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const {width, height} = nextProps;
        let {canvasWidth, canvasHeight, shapeWidth, shapeHeight, previousCanvasWidth, previousCanvasHeight} = this.state;
        if(width !== this.props.width || height !== this.props.height){
            const widthRatio = canvasWidth/shapeWidth,
                heightRatio = canvasHeight/shapeHeight;
            // shapeWidth = shapeWidth * widthRatio;
            // shapeHeight = shapeHeight * heightRatio;
            canvasWidth = width;
            canvasHeight = height;
            previousCanvasWidth = this.props.width;
            previousCanvasHeight = this.props.height;

        }
        this.setState(state => ({
            ...state,
            canvasWidth,
            canvasHeight,
            shapeWidth,
            shapeHeight,
            previousCanvasWidth,
            previousCanvasHeight
        }))
    }

    /**
     * Update the state based on the props.
     *
     * @returns {void}
     */
    componentDidMount() {
        let {canvasWidth, canvasHeight} = this.state;
            canvasWidth = this.props.width;
            canvasHeight = this.props.height;

        this.setState(state => ({
            ...state,
            canvasWidth,
            canvasHeight,
            shapeColor: this.props.shapeColor,
            backgroundColor: this.props.backgroundColor
        }));
        window.addEventListener('resize', this.resize);
        this.buildCanvas();
    }

    moveShape(index, arr){
        const canvasElement = document.getElementById('canvas').getBoundingClientRect();
        select(this.node)
            .select('.stamp')
            .attr('x', () => event.x - canvasElement.left)
            .attr('y', () => event.y - canvasElement.top)
        this.shape.posX = event.x - canvasElement.left;
        this.shape.posY = event.y - canvasElement.top;
    }

    buildCanvas(){
        this.shape = {
            width: 20,
            height: 20,
            posX: 100, 
            posY: 100
        };
        select(this.node)
            .selectAll('rect')
            .data([this.shape])
            .enter()
            .append('rect')
            .attr('class', 'stamp')
            .attr('fill', 'black')
            .attr('width', obj => obj.width)
            .attr('height', obj => obj.height)
            .attr('x', obj => obj.posX)
            .attr('y', obj => obj.posY)
            .attr('transform', obj => `translate(-${obj.width / 2}, -${obj.height / 2})`)

        select(this.node)
            .on('mousemove', (obj, index, arr) => this.moveShape(index, arr))
            .on('click', (obj, index, arr) => this.addShape(index, arr))
    }

    addShape(){
        this.shapeArr.push(this.shape)

        select(this.node)
            .selectAll('rect')
            .data(this.shapeArr)
            .enter()
            .append('rect')
            .attr('fill', 'black')
            .attr('width', obj => obj.width)
            .attr('height', obj => obj.height)
            .attr('x', obj => obj.posX)
            .attr('y', obj => obj.posY)
    }

    render() {
        const {canvasWidth, canvasHeight, posX, posY} = this.state;
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



