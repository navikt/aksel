const webpack = require('webpack');
const path = require("path");
var stylesPath = path.resolve(__dirname, 'eksempel.js');

module.exports = {
    entry: ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server', 'babel-polyfill', stylesPath],
    devtool: '#source-map',
    output: {
        filename: 'bundle.js',
    },
    plugins: [ new webpack.HotModuleReplacementPlugin()],
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            },
            {
                test: /\.jsx?$/,
                loaders: ['react-hot-loader', 'babel-loader'],
                include: [path.join(__dirname, 'eksempel.js'), path.join(__dirname, 'src')]
            }
        ]
    }
}