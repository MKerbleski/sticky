import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import {reducer }from './reducers';
import axios from 'axios';

import './index.css';
import App from './App.js';

axios.defaults.withCredentials = true;

const store = createStore(reducer,
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(
          logger,
          thunk), 
      );

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));
