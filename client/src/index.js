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
import './css/homePage.css';
import './css/canvas.css';
import './css/sidePanel.css';
import './css/topPanel.css';
import './css/navbar.css';
import './css/bottomPanel.css';
import './css/colorMenu.css';
import './css/colorPicker.css';
import './css/setupCanvas.css';
import './css/sizeMenu.css';
import './css/paletteMenu.css';

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

