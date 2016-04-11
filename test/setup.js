import jsdom from 'jsdom';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;

// Attach all the window properties to the mocha global object
for (const key in global.window) {
  if (!global.window.hasOwnProperty(key)) continue;
  if (key in global) continue;

  global[key] = global.window[key];
}
