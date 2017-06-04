const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'less-loader',
                        options: {
                            globalVars: {
                                nodeModulesPath: '\'./../..\'',
                                coreModulePath: '\'./../../../../node_modules\''
                            },
                            include: path.resolve(__dirname, '../')
                        }
                    }
                ]
            },
            {
                test: /\.md$/,
                use: [{ loader: 'raw-loader' }]
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            }
        ]
    }
};