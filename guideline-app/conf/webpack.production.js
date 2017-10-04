const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackProductionConfig = require('./_webpack.global');

WebpackProductionConfig.plugins = [
    new HtmlWebpackPlugin({
        template: './guideline-app/index.production.ejs',
        filename: 'index.html',
        inject: 'body',
        minimize: false
    })
];

WebpackProductionConfig.output = {
    path: path.join(__dirname, '../', 'dist'),
    publicPath: './',
    filename: '[name].js'
};

module.exports = WebpackProductionConfig;
