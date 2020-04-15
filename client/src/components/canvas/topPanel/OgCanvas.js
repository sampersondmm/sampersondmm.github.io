import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {postNewCanvas,clearCurrentCanvas,updateCanvas,removeCanvas} from '../store/actions/canvas';
import {hideNavigation, showNavigation} from '../store/actions/navbar';
import SidePanel from '../components/canvasMain/SidePanel';
import Instructions from '../components/canvasMain/Instructions';

class CssArt extends Component {

  constructor(props){
    super(props);
    this.state = {
      colorArrShape: [0,0,0,1],
      colorArrBackground: [220,220,255],
      colorStatus: 'shape',
      shapeStatus: 'square',
    }

    this.screenActive = false;
    this.move = [false,false,false,false];
    this.sizeChange = false;
    this.rotateChange = false;
    this.stayStill = false;
    this.rotateReverse = false;
    this.remove = false;
    this.stamp = false;
    this.stampArr = [];
    this.stampArrBacklog = [];

    this.posY = 100;
    this.posX = 100;
    this.width = 100;
    this.height = 100;
    this.radius = 50;
    this.angle = 0;
    this.angleSpeed = 2;
    this.degree = Math.PI/180;
    this.speed = 5;
    this.slowDown = false;
    this.opacityChange = false;
    this.remove = false;
    this.reUndo = false;

  }

  componentDidMount() {
    this.updateCanvas();
    this.props.hideNavigation();
    if(this.props.currentCanvas.canvasData){
      this.stampArr = this.props.currentCanvas.canvasData;
      this.setState({
        colorArrBackground: this.props.currentCanvas.canvasData[0]
      })
      console.log(this.props.currentCanvas);
      debugger;
      // this.colorArrBackground = this.props.currentCanvas.canvasData
    }
  }

  componentWillUnmount(){
    this.props.showNavigation();
    if(this.props.currentCanvas){
      this.props.clearCurrentCanvas();
    }
  }

  //changes size,rotation,position,...
  changeShapeProperties = () => {
    //if slowDown is true, speed is reduced
    if(this.slowDown){
      this.speed = 1;
      this.angleSpeed = .5;
    } else {
      this.speed = 5;
      this.angleSpeed = 2;
    }
    //changes position
    if(this.move[0] && !this.stayStill){this.posX -= this.speed}
    if(this.move[1] && !this.stayStill){this.posY -= this.speed}
    if(this.move[2] && !this.stayStill){this.posX += this.speed}
    if(this.move[3] && !this.stayStill){this.posY += this.speed}

    //prevents position change when adjusting size, rotation...
    if(this.size || this.rotateChange || this.red || this.green || this.blue || this.opacityChange){
      this.stayStill = true
    }else{
      this.stayStill = false
    }

    //change size
    if(this.state.shapeStatus === 'square'){
      if(this.rotateReverse){
        if(this.move[3] && this.size && this.width > 5){this.width -= this.speed}
        if(this.move[0] && this.size && this.height > 5){this.height -= this.speed}
        if(this.move[1] && this.size){this.width += this.speed}
        if(this.move[2] && this.size){this.height += this.speed}
      } else {
        if(this.move[0] && this.size && this.width > 5){this.width -= this.speed}
        if(this.move[3] && this.size && this.height > 5){this.height -= this.speed}
        if(this.move[2] && this.size){this.width += this.speed}
        if(this.move[1] && this.size){this.height += this.speed}
      }
    }
    if(this.state.shapeStatus === 'circle'){
      if(this.move[2] && this.size){this.radius += (this.speed/2)}
      if(this.move[0] && this.size && this.radius > 5){this.radius -= (this.speed/2)}
    }

    //change rotation
    if(this.state.shapeStatus === 'square'){
      if(this.move[0] && this.rotateChange){this.angle -= this.speed/3}
      if(this.move[2] && this.rotateChange){this.angle += this.speed/3}
    }

    //reset axis rotation
    if(this.angle > 0){
      if(this.angle > 45 || (this.angle > 225 && this.angle < 315)){
        this.rotateReverse = true;
      }
      if(this.angle < 45 || (this.angle > 135 && this.angle < 225) || this.angle > 315){
        this.rotateReverse = false;
      }
      if(this.angle > 360){
        this.angle = 0;
      }
    }

    if(this.angle < 0){
      if(this.angle < -45 || (this.angle < -225 && this.angle > -315)){
        this.rotateReverse = true;
      }
      if(this.angle > -45 || (this.angle < -135 && this.angle > -225) || this.angle < -315){
        this.rotateReverse = false;
      }
      if(this.angle < -360){
        this.angle = 0;
      }
    }

  }

  //removes last shape input
  undoLastInput = () => {
    if(this.remove && this.stampArr.length > 0){
      this.stampArrBacklog.push(this.stampArr[this.stampArr.length - 1]);
      this.stampArr.splice(-1);
      this.remove = false;
    } else {
      this.remove = false;
    }
  }

  //reinserts last shape input
  undoLastUndo = () => {
    if(this.reUndo && this.stampArrBacklog.length > 0){
      this.stampArr.push(this.stampArrBacklog[this.stampArrBacklog.length - 1]);
      this.stampArrBacklog.splice(-1);
      this.reUndo = false;
    } else {
      this.reUndo = false;
    }
  }

  //changes color for shape and background
  changeColorProperties = () => {
    // changes color propeties for shapes
    if(this.state.colorStatus === 'shape'){
      if(this.red){
        if(this.move[0]){
          if(this.state.colorArrShape[0] < 0){
            let newState = this.state.colorArrShape;
            this.setState({colorArrShape: [0,newState[1],newState[2],newState[3]]})
          }
          else {
            let newState = this.state.colorArrShape;
            this.setState({colorArrShape: [newState[0] -= 2,newState[1],newState[2],newState[3]]})
          }
        }
        if(this.move[2]){
          if(this.state.colorArrShape[0] > 255){
            let newState = this.state.colorArrShape;
            this.setState({colorArrShape: [255,newState[1],newState[2],newState[3]]})
          }
          else {
            let newState = this.state.colorArrShape;
            this.setState({colorArrShape: [newState[0] += 2,newState[1],newState[2],newState[3]]})
          }
        }
      }
      if(this.green){
        if(this.move[0]){
          if(this.state.colorArrShape[1] < 0){
            let newState = this.state.colorArrShape;
            this.setState({colorArrShape: [newState[0],0,newState[2],newState[3]]})
          }
          else {
            let newState = this.state.colorArrShape;
            this.setState({colorArrShape: [newState[0],newState[1] -= 2,newState[2],newState[3]]})
          }
        }
        if(this.move[2]){
          if(this.state.colorArrShape[1] > 255){
            let newState = this.state.colorArrShape;
            this.setState({colorArrShape: [newState[0],255,newState[2],newState[3]]})
          }
          else {
            let newState = this.state.colorArrShape;
            this.setState({colorArrShape: [newState[0],newState[1] += 2,newState[2],newState[3]]})
          }
        }
      }
      if(this.blue){
        if(this.move[0]){
          if(this.state.colorArrShape[2] < 0){
            let newState = this.state.colorArrShape;
            this.setState({colorArrShape: [newState[0],newState[1],0,newState[3]]})
          }
          else {
            let newState = this.state.colorArrShape;
            this.setState({colorArrShape: [newState[0],newState[1],newState[2] -= 2,newState[3]]})
          }
        }
        if(this.move[2]){
          if(this.state.colorArrShape[2] > 255){
            let newState = this.state.colorArrShape;
            this.setState({colorArrShape: [newState[0],newState[1],255,newState[3]]})
          }
          else {
            let newState = this.state.colorArrShape;
            this.setState({colorArrShape: [newState[0],newState[1],newState[2] += 2,newState[3]]})
          }
        }
      }
      //change opacity
      if(this.opacityChange){
        if(this.move[0]){
          if(this.state.colorArrShape[3] < 1){
            let newState = this.state.colorArrShape;
            this.setState({
              colorArrShape: [newState[0],newState[1],newState[2],newState[3] += .01]
            })
          } else {
            let newState = this.state.colorArrShape;
            this.setState({
              colorArrShape: [newState[0],newState[1],newState[2],1]
            })
          }
        }
        if(this.move[2]){
          if(this.state.colorArrShape[3] > 0){
            let newState = this.state.colorArrShape;
            this.setState({
              colorArrShape: [newState[0],newState[1],newState[2],newState[3] -= .01]
            })
          } else {
            let newState = this.state.colorArrShape;
            this.setState({
              colorArrShape: [newState[0],newState[1],newState[2],0]
            })
          }
        }
      }
    }

    // changes color propeties for shapes
    if(this.state.colorStatus === 'background'){
      //change red
      if(this.red){
        if(this.move[0]){
          if(this.state.colorArrBackground[0] < 0){
            let newState = this.state.colorArrBackground;
            this.setState({colorArrBackground: [0, newState[1], newState[2]]})
          }
          else {
            let newState = this.state.colorArrBackground;
            this.setState({colorArrBackground: [newState[0] -= 2, newState[1], newState[2]]})
          }
        }
        if(this.move[2]){
          if(this.state.colorArrBackground[0] > 255){
            let newState = this.state.colorArrBackground;
            this.setState({colorArrBackground: [255, newState[1], newState[2]]})
          }
          else {
            let newState = this.state.colorArrBackground;
            this.setState({colorArrBackground: [newState[0] += 2, newState[1], newState[2]]})
          }
        }
      }
      //change green
      if(this.green){
        if(this.move[0]){
          if(this.state.colorArrBackground[1] < 0){
            let newState = this.state.colorArrBackground;
            this.setState({colorArrBackground: [newState[0], 0, newState[2]]})
          }
          else {
            let newState = this.state.colorArrBackground;
            this.setState({colorArrBackground: [newState[0], newState[1] -= 2, newState[2]]})
          }
        }
        if(this.move[2]){
          if(this.state.colorArrBackground[1] > 255){
            let newState = this.state.colorArrBackground;
            this.setState({colorArrBackground: [newState[0], 255, newState[2]]})
          }
          else {
            let newState = this.state.colorArrBackground;
            this.setState({colorArrBackground: [newState[0], newState[1] += 2, newState[2]]})
          }
        }
      }
      //change blue
      if(this.blue){
        if(this.move[0]){
          if(this.state.colorArrBackground[2] < 0){
            let newState = this.state.colorArrBackground;
            this.setState({colorArrBackground: [newState[0], newState[1], 0]})
          }
          else {
            let newState = this.state.colorArrBackground;
            this.setState({colorArrBackground: [newState[0], newState[1], newState[2] -= 2]})
          }
        }
        if(this.move[2]){
          if(this.state.colorArrBackground[2] > 255){
            let newState = this.state.colorArrBackground;
            this.setState({colorArrBackground: [newState[0], newState[1], 255]})
          }
          else {
            let newState = this.state.colorArrBackground;
            this.setState({colorArrBackground: [newState[0], newState[1], newState[2] += 2]})
          }
        }
      }
    }
  }

  //switches between shape and background for color changing
  colorStatusHandler = params => {
    if(this.state.colorStatus === 'shape' && params === 'background'){
      this.setState({
        colorStatus: 'background'
      })
    }
    if(this.state.colorStatus === 'background' && params === 'shape'){
      this.setState({
        colorStatus: 'shape',
      })
    }
  }

  //switches between square and circle
  shapeStatusHandler = () => {
    if(this.state.shapeStatus === 'square'){
      this.setState({
        shapeStatus: 'circle'
      })
    }
    if(this.state.shapeStatus === 'circle'){
      this.setState({
        shapeStatus: 'square'
      })
    }
  }

  //pushes shapes into array to be rendered
  storeShapesInArray = (ctx) => {
    // determines shape
    if(this.state.shapeStatus === 'square'){
      ctx.beginPath();
      ctx.fillStyle = 'rgba(125,125,125,.5)';
      ctx.save();
      ctx.translate(this.posX,this.posY);
      ctx.rotate(this.angle * (Math.PI/180));
      ctx.fillRect(-this.width / 2,-this.height / 2,this.width,this.height);
      ctx.restore();
    }
    if(this.state.shapeStatus === 'circle'){
      ctx.beginPath();
      ctx.fillStyle = 'rgba(125,125,125,.5)';
      ctx.arc(this.posX,this.posY,this.radius,0*Math.PI,2*Math.PI);
      ctx.fill();
    }

    //pushes into array
    if(this.stamp && this.state.shapeStatus === 'square'){
      this.stampArr.push(
        {
          posX: this.posX,
          posY: this.posY,
          width: this.width,
          height: this.height,
          angle: this.angle,
          colorShape: [this.state.colorArrShape[0], this.state.colorArrShape[1], this.state.colorArrShape[2]],
          colorBackground: [this.state.colorArrBackground[0],this.state.colorArrBackground[1],this.state.colorArrBackground[2]],
          opacity: this.state.colorArrShape[3],
          shapeStatus:'square',
        }
      );
    }
    if(this.stamp && this.state.shapeStatus === 'circle'){
      this.stampArr.push(
        {
          posX: this.posX,
          posY: this.posY,
          radius: this.radius,
          colorShape: [this.state.colorArrShape[0], this.state.colorArrShape[1], this.state.colorArrShape[2]],
          opacity: this.state.colorArrShape[3],
          shapeStatus:'circle',
        }
      );
    }
    this.stamp = false;
  }

  //render shapes that are in storeShapesInArray
  renderShapes = (ctx) => {

    this.stampArr.forEach(function(el){
      if(el.shapeStatus === 'square'){
        let canvasFunction = (posX,posY,width,height,angle,colorShape,opacity) => {
          ctx.beginPath();
          ctx.fillStyle = 'rgba('+el.colorShape[0]+','+el.colorShape[1]+','+el.colorShape[2]+','+el.opacity+')';
          ctx.save();
          ctx.translate(el.posX, el.posY);
          ctx.rotate(el.angle * (Math.PI/180));
          ctx.fillRect(-el.width / 2,-el.height / 2,el.width,el.height);
          ctx.restore();
        }
        canvasFunction();
      }
      if(el.shapeStatus === 'circle'){
        let canvasFunction = (posX,posY,radius,color,opacity) => {
          ctx.beginPath();
          ctx.fillStyle = 'rgba('+el.colorShape[0]+','+el.colorShape[1]+','+el.colorShape[2]+','+el.opacity+')';
          ctx.arc(el.posX,el.posY,el.radius,0*Math.PI,2*Math.PI);
          ctx.fill();
        }
        canvasFunction();
      }
    });
  }

  //Main editor loop
  updateCanvas = () => {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    //======================================================
    //======================================================
    setInterval(function(){
      //set the defaults for the background, and sets up canvas
      ctx.beginPath();
      ctx.fillStyle = 'rgb('+this.state.colorArrBackground[0]+','+this.state.colorArrBackground[1]+','+this.state.colorArrBackground[2]+')'
      ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height)

      //changes made to shapes
      this.changeShapeProperties();

      //changes colors for shapes and background
      this.changeColorProperties();

      //renders the shapes that were stored in array
      this.renderShapes(ctx);

      //pushes shapes into array for storage
      this.storeShapesInArray(ctx);

      //removes last shape input
      this.undoLastInput();

      //reinserts last shape removed
      this.undoLastUndo();


    }.bind(this),25);
    //======================================================
    //======================================================
    //======End of setInterval==============================
  }

  //removes all shapes from editor
  clearCanvas = () => {
    this.stampArr = [];
    console.log(this.props.currentCanvas)
    debugger;
  }

  //submits into database
  submitCanvas = () => {
    if(this.props.currentCanvas.canvasData){
      this.stampArr.shift();
      this.stampArr.unshift(this.state.colorArrBackground);
      this.props.removeCanvas(this.props.currentCanvas.user._id,this.props.currentCanvas._id);
      this.props.postNewCanvas(this.stampArr)
        .then(() => this.props.history.push('/users/:id/profile'))
    } else {
      this.stampArr.unshift(this.state.colorArrBackground);
      this.props.postNewCanvas(this.stampArr);
      this.props.history.push('/');
    }
  }

  exitCanvas = () => {
    this.props.history.push('/')
  }

  //handles key press events
  keyDown = (e) => {
    e.preventDefault();
    const key = e.keyCode;
    if(key === 37){this.move[0] = true}
    if(key === 38){this.move[1] = true}
    if(key === 39){this.move[2] = true}
    if(key === 40){this.move[3] = true}

    if(key === 16){this.slowDown = true}

    if(key === 90){this.remove = true}
    if(key === 88){this.reUndo = true}

    if(key === 81){this.red = true}
    if(key === 87){this.green = true}
    if(key === 69){this.blue = true}
    if(key === 82){this.opacityChange = true}

    if(key === 49){this.size = true}
    if(key === 32){this.stamp = true}
    if(key === 50){this.rotateChange = true}
  }

  //handles key press events
  keyUp = (e) => {
    const key = e.keyCode;
    if(key === 37){this.move[0] = false}
    if(key === 38){this.move[1] = false}
    if(key === 39){this.move[2] = false}
    if(key === 40){this.move[3] = false}

    if(key === 16){this.slowDown = false}

    if(key === 81){this.red = false}
    if(key === 87){this.green = false}
    if(key === 69){this.blue = false}
    if(key === 82){this.opacityChange = false}

    if(key === 49){this.size = false}
    if(key === 50){this.rotateChange = false}
  }

  render(){
    const style = {
      pageWrap: {
        backgroundColor:'rgb(150,150,150)',
        width:'100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
      },
      canvasWrap: {
        display:'flex',
      },
      main: {
        display:'flex',
        width:'90vw',
        height:'100vh',
      }
    }
    return(
      <div style={style.pageWrap}>
        <div style={style.canvasWrap}>

          <SidePanel

            colorArrShape={this.state.colorArrShape}
            colorArrBackground={this.state.colorArrBackground}

            opacity={this.state.opacity}

            colorStatusHandler={this.colorStatusHandler}
            colorStatus={this.state.colorStatus}

            shapeStatusHandler={this.shapeStatusHandler}
            shapeStatus={this.state.shapeStatus}

            clearCanvas={this.clearCanvas}
            submitCanvas={this.submitCanvas}
            exitCanvas={this.exitCanvas}

          />

          <canvas style={style.main} ref="canvas" tabIndex='0' onKeyDown={this.keyDown} onKeyUp={this.keyUp}/>

        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    currentCanvas: state.currentCanvas,
    colorStatus: state.colorStatus,
    errors: state.errors,
  }
}


export default connect(mapStateToProps, {postNewCanvas, removeCanvas, updateCanvas, clearCurrentCanvas, hideNavigation, showNavigation})(CssArt);

