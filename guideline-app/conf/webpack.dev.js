const path = require('path');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const WebpackDevConfig = require('./_webpack.global');

const htmlRule = {
    test: /\.html$/,
    use: [
        { loader: 'html-loader' },
        { loader: 'file-loader' }
    ]
};

WebpackDevConfig.module.rules.push(htmlRule);

const addModuleIncludePaths = (rule, subdir) => {
    const changedRule = rule;
    if (rule.include) {
        changedRule.include.push(path.resolve(__dirname, subdir));
    } else {
        // eslint-disable-next-line no-param-reassign
        changedRule.include = [path.resolve(__dirname, subdir)];
    }
    return changedRule;
};

let babelRule = WebpackDevConfig.module.rules.find((rule) => (rule.loader === 'babel-loader'));
const pathToModules = './../../packages/node_modules';
// eslint-disable-next-line no-unused-vars
babelRule = addModuleIncludePaths(babelRule, pathToModules);

WebpackDevConfig.devServer = {
    historyApiFallback: true,
    contentBase: [path.join(__dirname, './../'), path.join(__dirname, './../../packages/')],
    watchContentBase: true
};
WebpackDevConfig.output = {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].js'
};
WebpackDevConfig.resolve.plugins = [
    new DirectoryNamedWebpackPlugin({
        honorPackage: ['jsnext:main']
    })
];
WebpackDevConfig.devtool = 'inline-source-map';

module.exports = WebpackDevConfig;
