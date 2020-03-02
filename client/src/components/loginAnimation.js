import React, {Component} from 'react';

class Circle {
    constructor(
        ctx,
        posX,
        posY,
        speedX,
        speedY,
        radius,
        color,
        particles,
        canvasWidth,
        canvasHeight,
        connectionDistance
    ) {
        this.ctx = ctx;
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
        this.particles = particles;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.connectionDistance = connectionDistance;
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.globalCompositeOperation = 'source-over';
        this.ctx.fillStyle = this.color;
        this.ctx.globalAlpha = 1;
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
        this.ctx.fill();
        this.ctx.closePath();

        for (let j = 0; j < this.particles.length; j++) {
            const currentParticle = this.particles[j],
                id = Math.floor(Math.random() * 1000000),
                yd = currentParticle.posY - this.posY,
                xd = currentParticle.posX - this.posX,
                distance = Math.sqrt(xd * xd + yd * yd);

            if (distance < this.connectionDistance) {
                this.ctx.beginPath();
                this.ctx.globalAlpha = (this.connectionDistance - distance) / (this.connectionDistance - 0);
                this.ctx.lineWidth = 0.5;
                this.ctx.moveTo(this.posX, this.posY);
                this.ctx.lineTo(currentParticle.posX, currentParticle.posY);
                this.ctx.strokeStyle = this.color;
                this.ctx.lineCap = 'round';
                this.ctx.stroke();
                this.ctx.closePath();
            }
        }
    }
}

export default class CircleCanvas extends Component {
    /**
     * Creates an instance of the Canvas
     *
     * @param {object.<string, any>} props The props.
     */
    constructor(props) {
        super(props);
        this.backgroundColor = 'rgb(200,200,200)';
        // this.circleColor = 'rgb(100,120,120)';
        this.circleColor = 'rgb(150,150,180)';
        this.speedConst = 0.5;
        this.particleCount = 150;
        this.connectionDistance = 100;
        this.particles = [];
        this.lines = [];
        this.updateAnimationState = this.updateAnimationState.bind(this);
        this.initializeCircles = this.initializeCircles.bind(this);
        this.state = {
            posX: 0,
            posY: 0,
            speedY: 0,
            speedX: 0,
            canvasWidth: 0,
            canvasHeight: 0
        };
        this.saveContext = this.saveContext.bind(this);
        this.particles = [];
        this.resize = this.resize.bind(this);
    }

    /**
     * @returns {null} nothing
     */
    componentWillMount() {
        cancelAnimationFrame(this.raf);
    }

    /**
     * Update the state based on the props.
     *
     * @returns {void}
     */
    componentDidMount() {
        let {canvasWidth, canvasHeight} = this.state;
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        this.initializeCircles(canvasWidth, canvasHeight);
        this.setState(state => ({
            ...state,
            canvasWidth,
            canvasHeight
        }));
        this.raf = requestAnimationFrame(this.updateAnimationState);
        window.addEventListener('resize', this.resize);
    }

    /**
     * When component updates, call render function of circles
     *
     * @returns {void}
     */
    componentDidUpdate() {
        const {canvasWidth, canvasHeight} = this.state;

        // Sets the background before the circle is draw with each animation tick.
        // If this wasn't set, it would appear to be moving lines, not circles
        this.ctx.beginPath();
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        this.ctx.closePath();

        // For each circle in canvas, call function that draws circle
        for (const circle of this.particles) {
            circle.draw();
        }
    }

    /**
     * @returns {void}
     */
    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    /**
     * Resize the canvas when window is resized
     *
     * @returns {null} Nothing
     */
    resize() {
        this.setState(state => ({
            ...state,
            canvasWidth: window.innerWidth,
            canvasHeight: window.innerHeight
        }));
    }

    /**
     * Create the circles, and generate a random starting position for them
     *
     * @param {number} canvasWidth, the canvas width
     * @param {number} canvasHeight, the canvas height
     * @returns {void}
     */
    initializeCircles(canvasWidth, canvasHeight) {
        for (let i = 0; i < this.particleCount; i++) {
            let speedX, speedY;
            const posX = Math.floor(Math.random() * canvasWidth);
            const posY = Math.floor(Math.random() * canvasHeight);
            const ranSpeedX = Math.floor(Math.random() * 2);
            const ranSpeedY = Math.floor(Math.random() * 2);
            const radius = 3;
            if (ranSpeedX === 0) {
                speedX = -this.speedConst;
            } else {
                speedX = this.speedConst;
            }
            if (ranSpeedY === 0) {
                speedY = -this.speedConst;
            } else {
                speedY = this.speedConst;
            }
            const circle = new Circle(
                this.ctx,
                posX,
                posY,
                speedX,
                speedY,
                radius,
                this.circleColor,
                this.particles,
                canvasWidth,
                canvasHeight,
                this.connectionDistance
            );
            this.particles.push(circle);
        }
    }

    /**
     * Saves the canvas context
     *
     * @param {func} ctx, the canvas context
     */
    saveContext(ctx) {
        this.ctx = ctx;
    }

    /**
     * With each animation tick, this fucntion is called.
     * This is where the animation occurs
     *
     * @returns {null}
     */
    updateAnimationState() {
        const {state, speedConst} = this,
            {canvasWidth, canvasHeight} = state,
            radius = 5;

        for (const circle of this.particles) {
            let {speedX, speedY, posX, posY} = circle;

            posX += speedX;
            posY += speedY;

            if (posX <= 0 + radius) {
                speedX = speedConst;
            }

            if (posX >= canvasWidth - radius) {
                speedX = -speedConst;
            }

            if (posY <= 0 + radius) {
                speedY = speedConst;
            }

            if (posY >= canvasHeight - radius) {
                speedY = -speedConst;
            }

            circle.speedX = speedX;
            circle.speedY = speedY;
            circle.posX = posX;
            circle.posY = posY;
        }

        this.setState(state => ({...state}));
        this.raf = requestAnimationFrame(this.updateAnimationState);
    }

    render() {
        const {canvasWidth, canvasHeight} = this.state;
        return (
            <PureCanvas
                contextRef={this.saveContext}
                canvasWidth={canvasWidth}
                canvasHeight={canvasHeight}
            ></PureCanvas>
        );
    }
}

class PureCanvas extends Component {
    shouldComponentUpdate() {
        return true;
    }

    render() {
        return (
            <canvas
                style={{
                    width: this.props.canvasWidth === 0 ? window.innerWidth : this.props.canvasWidth,
                    height: this.props.canvasHeight === 0 ? window.innerHeight : this.props.canvasHeight,
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
                width={this.props.canvasWidth === 0 ? window.innerWidth : this.props.canvasWidth}
                height={this.props.canvasHeight === 0 ? window.innerHeight : this.props.canvasHeight}
                ref={node => (node ? this.props.contextRef(node.getContext('2d')) : null)}
            />
        );
    }
}
