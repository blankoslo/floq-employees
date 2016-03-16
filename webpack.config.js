var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  output: {
    path: __dirname + "/dist/js",
    filename: "app.bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map',
  module: {
      loaders: [
          { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
          { test: /\.json$/, loader: "json" },
          { test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/, include: __dirname }
      ]
  }
};
