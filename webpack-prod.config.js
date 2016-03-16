var webpack = require('webpack');

module.exports = {
  entry: [ './src/index.js' ],
  output: {
    path: __dirname + "/dist/js",
    filename: "app.bundle.js"
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],
  devtool: 'source-map',
  module: {
      loaders: [
          { test: /\.less$/, loader: "style!css!less" },
          { test: /\.json$/, loader: "json" },
          { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/, include: __dirname }
      ]
  }
};
