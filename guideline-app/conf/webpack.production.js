var webpack = require('webpack'),
    path = require('path'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    WebpackProductionConfig = require('./_webpack.global');

WebpackProductionConfig.plugins = [
    new HtmlWebpackPlugin({
        template: './guideline-app/index.html',
        filename: 'index.html',
        inject: 'body'
    })
];

WebpackProductionConfig.output = {
    path: path.join(__dirname, '../', 'dist'),
    publicPath: './',
    filename: '[name].js'
};

module.exports = WebpackProductionConfig;