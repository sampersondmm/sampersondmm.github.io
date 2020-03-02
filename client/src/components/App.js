import React from 'react';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import Canvas from './canvas/Canvas';
import {Route} from 'react-router-dom';

function App() {
  const style = {
    main: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
  return (
    <div style={style.main}>
      <Route path='/' exact component={HomePage}/>
      <Route path='/login' component={LoginPage}/>
      <Route path='/canvas/new' component={Canvas}/>
    </div>
  );
}

export default App;
