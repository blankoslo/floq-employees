import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

import apiMiddleware from './middleware/api';
import _reducers from './reducers';
import App from './containers/app';

require('../styles/main.less');

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    ..._reducers
  });

const history = createBrowserHistory();

/* eslint no-underscore-dangle: 0 */
const store = createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(apiMiddleware, routerMiddleware(history)),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);
/* eslint no-underscore-dangle: 1 */

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/employees" component={App} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
