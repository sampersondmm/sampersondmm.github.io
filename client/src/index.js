import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import rootReducer from './reducers';
import {createStore, compose} from 'redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import './fontAwesome/css/all.css';

import './index.css';
import './css/base.css';
import './css/loginPage.css';
import './css/panelButton.css';
import './css/homePage.css';
import './css/canvas.css';
import './css/rightPanel.css';
import './css/leftPanel.css';
import './css/topPanel.css';
import './css/navbar.css';
import './css/colorMenu.css';
import './css/colorPicker.css';
import './css/setupCanvas.css';
import './css/paletteMenu.css';
import './css/shapeMenu.css';
import './css/zoomMenu.css';
import './css/layerMenu.css';
import './css/layerMenu2.css';

export const store = createStore(
    rootReducer,
    compose(
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    )
  );

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));

