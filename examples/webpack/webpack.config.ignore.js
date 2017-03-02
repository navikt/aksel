const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'out'),
        filename: 'bundle.nostyles.js'
    },
    module: {
        loaders: [
            { test: /\.less$/, loader: 'ignore-loader' }
        ]
    }
};