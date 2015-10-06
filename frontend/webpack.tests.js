// *Some* environments (phantomjs) don't have es5 (Function.prototype.bind)
require('babel-core/polyfill');

// this regex matches any js files in __test__ directories
var context = require.context('./app', true, /test\/.+\.js$/);
context.keys().forEach(context);