import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';

const $ = jquery(global.window);

// build 'renderComponent' helper that should render a given react class
const renderComponent = (ComponentClass, props, state) => {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance)); // produces HTML
};

// Build helper for simulating events
$.fn.simulate = (eventName, value) => {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

// Set up chai-jquery
chaiJquery(chai, chai.util, $);

export { renderComponent, expect };
