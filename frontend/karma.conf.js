var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS', 'Chrome' ],
    singleRun: true, //just run once by default
    frameworks: [ 'jasmine' ],
    files: [
      'webpack.tests.js' //just load this file
    ],
    preprocessors: {
      'webpack.tests.js': [ 'webpack', 'sourcemap' ] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'dots' ], //report results in this format
    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [
          {
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel'
          }
        ]
      }
    },
    client: {
      // log console output in our test console
      captureConsole: true
    },
    webpackMiddleware: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};