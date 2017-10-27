const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackProductionConfig = require('./_webpack.global');

WebpackProductionConfig.plugins = [
    new HtmlWebpackPlugin({
        template: './guideline-app/index.production.ejs',
        filename: 'index.html',
        inject: 'body',
        minimize: {
            minimizeJS: {
                mangle: false,
                compress: false
            }
        }
    })
];

const babelRule = WebpackProductionConfig.module.rules.find((rule) => (rule.loader === 'babel-loader'));

if (babelRule) {
    if (babelRule.include) {
        babelRule.include.push(/_([a-z]|[A-Z])+\.example\.js/);
        babelRule.include.push(/_([a-z]|[A-Z])+\.sample\.js/);
    } else {
        babelRule.include = [/_([a-z]|[A-Z])+\.sample\.js/];
        babelRule.include.push(/_([a-z]|[A-Z])+\.example\.js/);
    }
}

WebpackProductionConfig.output = {
    path: path.join(__dirname, '../', 'dist'),
    publicPath: './',
    filename: '[name].js'
};

module.exports = WebpackProductionConfig;
