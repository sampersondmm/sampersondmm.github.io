import React, {Component} from 'react';
import NavBar from './NavBar';

class HomePage extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className='homepage'>
                <NavBar/>
            </div>
        )
    }
}

export default HomePage;