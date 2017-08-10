var path = require('path'),
    WebpackDevConfig = require('./_webpack.global'),
    DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");

var htmlRule = {
    test: /\.html$/,
    use: [
        { loader: 'html-loader' },
        { loader: 'file-loader' }
    ]
};

WebpackDevConfig.module.rules.push(htmlRule);

let babelRule = WebpackDevConfig.module.rules.find(
    (rule) => (rule.loader === 'babel-loader')
);

if (babelRule) {
    if (babelRule.include) {
        babelRule.include.push(path.resolve(__dirname, './../../packages/node_modules'));
    }
    else {
        babelRule.include([path.resolve(__dirname, './../../packages/node_modules')]);
    }
}

WebpackDevConfig.devServer = {
    historyApiFallback: true,
    contentBase: [path.join(__dirname, './../'), path.join(__dirname, "./../../packages/")],
    watchContentBase: true
};
WebpackDevConfig.output = {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].js',
};
WebpackDevConfig.resolve.plugins = [
    new DirectoryNamedWebpackPlugin({
        honorPackage: ['jsnext:main']
    })
];

module.exports = WebpackDevConfig;