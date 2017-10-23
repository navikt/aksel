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
    entry: {
        scripts: './guideline-app/app/ui/app.js',
        vendors
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
                test: /\.example\.txt?$/,
                loader: 'raw-loader'
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, './../app')
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
                    { loader: 'html-loader' },
                    { loader: 'markdown-loader' }
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
            name: 'vendors'
        })
    ]
};

module.exports = GlobalWebpackConfig;
