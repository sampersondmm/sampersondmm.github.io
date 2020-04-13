import React, {Component} from 'react';

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
        this.lines = [];

        this.state = {
            posX: 0,
            posY: 0,
            speedY: 0,
            speedX: 0,
            canvasWidth: 0,
            canvasHeight: 0
        };
        this.particles = [];
        this.handlePosition = this.handlePosition.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const {width, height} = nextProps;
        if(width !== this.props.width || height !== this.props.height){
            this.setState(state => ({
                ...state,
                canvasWidth: width,
                canvasHeight: height
            }))
        }
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
    }

    handlePosition(x, y){
        const rect = document.getElementById('canvas').getBoundingClientRect(),
            posX = x - rect.left,
            posY = y - rect.top;
        this.setState(state => ({
            ...state,
            posX,
            posY
        }))
    }

    render() {
        const {canvasWidth, canvasHeight, posX, posY} = this.state;
        const style = {
            main: {
                width: `${canvasWidth}px`,
                height: `${canvasHeight}px`,
                backgroundColor: this.props.backgroundColor,
                position: 'relative'
            },
            shape: {
                width: '10px',
                height: '10px',
                backgroundColor: 'black',
                position: 'absolute',
                top: `${posY - 5}px`,
                left: `${posX - 5}px`
            }
        }
        return (
            <div 
                id='canvas'
                style={style.main} 
                onMouseMove={({clientX: x, clientY: y}) => this.handlePosition(x, y)}
            >
                <div style={style.shape}></div>
            </div>
        );
    }
}



