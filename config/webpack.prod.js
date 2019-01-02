const webpack = require("webpack");
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, "../dist/js"),
    filename: "app.bundle.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
});