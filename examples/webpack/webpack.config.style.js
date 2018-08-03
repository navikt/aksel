const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'out'),
        filename: 'bundle.styles.js'
    },
    module: {
        loaders: [
            { test: /\.less$/, loader: ['style-loader', 'css-loader', 'less-loader'] }
        ]
    }
};