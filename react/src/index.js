import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore, applyMiddleware} from 'redux';
import allReducers from './Reducers/allReducer';
import {Provider} from 'react-redux';
import {logger} from 'redux-logger';
import thunk from 'redux-thunk';
import AuthExample from './App';
// import registerServiceWorker from './registerServiceWorker';


const store = createStore(allReducers, applyMiddleware(thunk, logger));


ReactDOM.render(
    <Provider store={store}>
        <AuthExample />
    </Provider>
    , document.getElementById('root')
);
// registerServiceWorker();
