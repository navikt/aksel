const webpack = require('webpack');
const path = require('path');

const vendors = [
    'react',
    'react-dom',
    'react-router-dom',
    'react-redux',
    'redux',
    'redux-logger'
];

const GlobalWebpackConfig = {
    devtool: 'inline-source-map',
    entry: {
        vendors,
        polyfill: 'babel-polyfill',
        scripts: './guideline-app/app/ui/app.js'
    },
    module: {
        rules: [
            {
                test: /\.png$/,
                use: [
                    { loader: 'file-loader?name=[name].[ext]' }
                ]
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, './../app')
                ],
                exclude: [/\.no-transpilation\.jsx?$/],
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
            },
            {
                test: /\.md$/,
                use: [
                    { loader: 'raw-loader' }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            NavFrontendModules: path.resolve(__dirname, './../../packages/node_modules')
        }
    },
    externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react-addons-test-utils': 'react-dom'
    },
    plugins: [
        new webpack.ProvidePlugin({
            'React': 'react' // eslint-disable-line quote-props
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['polyfill', 'vendors', 'scripts']
        })
    ]
};

module.exports = GlobalWebpackConfig;
