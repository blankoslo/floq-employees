const webpack = require('webpack');
const { argv } = require('yargs');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  entry: ['./src/index.js'],
  output: {
    path: `${__dirname}/dist/js`,
    filename: 'app.bundle.js',
    publicPath: `http://localhost:${argv.port}/`
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: 'cheap-module-source-map',
  devServer: {
    clientLogLevel: 'info',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    }
  }
});
