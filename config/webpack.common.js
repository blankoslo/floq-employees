module.exports = {
  module: {
    rules: [
        {
            test: /\.svg/,
            use: {
                loader: 'svg-url-loader',
                options: {}
            }
        },
        { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
        { test: /\.json$/, loader: 'json-loader' },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader'
            }
        },
        {
            test: [/\.(ttf|woff)$/],
            loader: 'file-loader',
            options: {
            // See floq project for path
            name: 'static/fonts/[name].[ext]'
            }
        }
    ]
  }
};
