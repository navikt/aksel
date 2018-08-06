const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'out'),
        filename: 'bundle.nostyles.js'
    },
    module: {
        rules: [
            { test: /\.less$/, loader: 'ignore-loader' }
        ]
    }
};