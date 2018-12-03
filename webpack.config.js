const webpack = require("webpack");

const port = process.env.PORT || 8080;

module.exports = {
  entry: [
    `webpack-dev-server/client?http://localhost:5000/`,
    "webpack/hot/only-dev-server",
    "./src/index.js"
  ],
  output: {
    path: __dirname + "/dist/js",
    filename: "app.bundle.js",
    publicPath: `http://localhost:5000/`
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: "source-map",
  devServer: {
    clientLogLevel: "info"
  },
  module: {
    preLoaders: [{ test: /\.js?$/, loaders: ["eslint"] }],
    loaders: [
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.json$/, loader: "json" },
      {
        test: /\.js$/,
        loaders: ["react-hot", "babel"],
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: "file?name=public/fonts/[name].[ext]",
        options: {
          emitFile: false
        }
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader?limit=100000"
      }
    ]
  }
};
