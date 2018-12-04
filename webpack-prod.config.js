var webpack = require("webpack");

module.exports = {
  mode: "production",
  entry: ["./src/index.js"],
  output: {
    path: __dirname + "/dist/js",
    filename: "app.bundle.js"
  },
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ],
  optimization: {
    minimizer: new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  },
  module: {
    rules: [
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.js$/, loaders: ["babel-loader"], exclude: /node_modules/, include: __dirname },
      {
        test: [/\.(ttf|woff)$/],
        loader: "file-loader",
        options: {
          // See floq project for path
          name: "static/fonts/[name].[ext]"
        }
      }
    ]
  }
};
