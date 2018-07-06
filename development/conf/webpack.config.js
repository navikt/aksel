const webpack = require('webpack');
const path = require('path');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

const vendors = [
    'react',
    'react-dom'
];

const GlobalWebpackConfig = {
    devServer: {
        historyApiFallback: true,
        contentBase: [
            path.join(__dirname, './../app'),
            path.join(__dirname, './../../packages/')
        ],
        watchContentBase: true
    },
    entry: {
        scripts: './development/app/bootstrap.js',
        vendors
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    { loader: 'html-loader' },
                    { loader: 'file-loader' }
                ]
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, './../app'),
                    path.resolve(__dirname, './../../packages')
                ],
                query: {
                    presets: ['es2015', 'stage-2', 'react'],
                    plugins: ['react-docgen', 'transform-object-rest-spread']
                }
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: '[name].js'
    },
    resolve: {
        plugins: [
            new DirectoryNamedWebpackPlugin({
                honorPackage: ['jsnext:main']
            })
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors'
        })
    ]
};

module.exports = GlobalWebpackConfig;
