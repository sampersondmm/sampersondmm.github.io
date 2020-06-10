import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCanvasList, clearCanvasData} from '../actions/canvasActions';
import map from 'lodash/map';
import CanvasItem from './CanvasItem';

class CanvasList extends Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.fetchCanvasList();
    }
    render(){
        let canvasList = map(this.props.canvasList, canvasItem => {
            return <CanvasItem key={canvasItem._id} canvasData={canvasItem.canvasData}/>
        });
        return (
            <div className='canvas-list-wrap'>
                {canvasList}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        canvasList: state.canvas.canvasList,
    }
}

export default connect(mapStateToProps, {fetchCanvasList, clearCanvasData})(CanvasList);