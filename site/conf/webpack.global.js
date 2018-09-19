const webpack = require('webpack');
const path = require('path');

const GlobalWebpackConfig = {
    devtool: 'inline-source-map',
    entry: path.resolve(__dirname, '../app/init.jsx'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                include: [
                    path.resolve(__dirname, '../app')
                ],
                loader: 'babel-loader'
            }
        ]
    }
};

module.exports = GlobalWebpackConfig;