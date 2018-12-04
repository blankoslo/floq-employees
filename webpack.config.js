const webpack = require("webpack");
const argv = require("yargs").argv;

module.exports = {
  mode: "development",
  entry: [
    `webpack-dev-server/client?http://localhost:${argv.port}/`,
    "webpack/hot/only-dev-server",
    "./src/index.js"
  ],
  output: {
    path: __dirname + "/dist/js",
    filename: "app.bundle.js",
    publicPath: `http://localhost:${argv.port}/`
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: "source-map",
  devServer: {
    clientLogLevel: "info",
    headers: {
      "Access-Control-Allow-Origin": `http://localhost:${argv.floq_port}`,
      "Access-Control-Allow-Headers": `http://localhost:${argv.floq_port}`
    }
  },
  module: {
    rules: [
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
      { test: /\.json$/, loader: "json-loader" },
      // { test: /\.js?$/, loaders: ["eslint"], enforce: "pre" },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
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
