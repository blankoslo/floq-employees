import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = compose(
    applyMiddleware(promiseMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.getElementById('app'));
