var webpack = require('webpack'),
    path = require('path');

var GlobalWebpackConfig = {
    entry: {
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
                exclude: /node_modules/,
                query: {
                    presets: [ 'es2015', 'stage-0', 'react' ]
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
        ]
    }
};

module.exports = GlobalWebpackConfig;