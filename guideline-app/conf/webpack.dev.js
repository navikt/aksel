var path = require('path'),
    WebpackDevConfig = require('./_webpack.global');

var htmlRule = {
    test: /\.html$/,
    use: [
        { loader: 'html-loader' },
        { loader: 'file-loader' }
    ]
};

WebpackDevConfig.module.rules.push(htmlRule);
WebpackDevConfig.devServer = {
    historyApiFallback: true,
    contentBase: path.join(__dirname, './../')
};
WebpackDevConfig.output = {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].js',
};

module.exports = WebpackDevConfig;