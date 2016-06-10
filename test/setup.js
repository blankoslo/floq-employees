import jsdom from 'jsdom';
import jquery from 'jquery';
import chai from 'chai';
import chaiJquery from 'chai-jquery';

// Set up testing environment to run like a browser in the command line
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
const $ = jquery(global.window);

chaiJquery(chai, chai.util, $);

// Attach all the window properties to the mocha global object
for (const key in global.window) { // eslint-disable-line no-restricted-syntax
  if (!global.window.hasOwnProperty(key)) continue;
  if (key in global) continue;

  global[key] = global.window[key];
}
