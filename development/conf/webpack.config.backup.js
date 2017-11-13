const webpack = require('webpack');
const path = require('path');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const vendors = ['react', 'react-dom'];

const WebpackConfig = {
    entry: {
        scripts: './development/app/bootstrap.js',
        vendors
    },
    devServer: {
        historyApiFallback: true,
        contentBase: [
            path.join(__dirname, './../app'),
            path.join(__dirname, './../../packages/')
        ],
        watchContentBase: true
    },
    module: {
        rules: [
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
                test: /\.html$/,
                use: [
                    { loader: 'html-loader' },
                    { loader: 'file-loader' }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'less-loader',
                        options: {
                            globalVars: {
                                nodeModulesPath: '\'~\'',
                                coreModulePath: '\'~\''
                            },
                            include: path.resolve(__dirname, '../')
                        }
                    }
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
        mainFields: ['main'],
        modules: [path.resolve(__dirname, './../../node_modules'), 'node_modules']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors'
        }),
        new DirectoryNamedWebpackPlugin({
            honorIndex: false,
            honorPackage: false,
            transformFn: function(dirName) {
                return ['jsnext:main', 'main']
            }
        })
    ]
};

module.exports = WebpackConfig;
