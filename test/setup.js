import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
const { JSDOM } = require('jsdom');

chai.use(chaiEnzyme());
Enzyme.configure({ adapter: new Adapter() });

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target)
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};
global.requestAnimationFrame = callback => setTimeout(callback, 0);
global.cancelAnimationFrame = id => {
  clearTimeout(id);
};
copyProps(window, global);
