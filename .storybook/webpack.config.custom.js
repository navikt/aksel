const path = require('path');

module.exports = {
    module: {
        noParse: /less.dist.less\.js$/,
        loaders: [
            {
                test: /\.less$/,
                loaders: ['style', 'css', 'less?{"globalVars":{"nodeModulesPath":"\'./../..\'", "coreModulePath":"\'./../../../../node_modules\'"}}'],
                include: path.resolve(__dirname, '../')
            },
            {
                test: /\.md$/,
                loaders: ['raw']
            },
            {
                test: /\.json$/,
                loaders: ['json']
            },
            {
                test: /\.css$/,
                loaders: ['style', 'css']
            }
        ]
    }
};