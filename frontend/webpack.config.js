var webpack = require('webpack');

module.exports = {
    context: __dirname + "/app",
    entry: "./app.jsx",
    output: {
        path: __dirname + "/public/dist",
        filename: "app.bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel'
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            }
        ]
    }
};
