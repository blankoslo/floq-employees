var webpack = require('webpack');

module.exports = {
  entry: [ './script/index.js' ],
  output: {
    path: __dirname + "/dist/js",
    filename: "app.bundle.js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    })
  ],
  module: {
      loaders: [
          { test: /\.less$/, loader: 'style!css!less' },
          { test: /\.json$/, loader: "json" },
          { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/, include: __dirname }
      ]
  }
};
