const path = require("path");
var stylesPath = path.resolve(__dirname, 'eksempel.less');

module.exports = {
    entry: [stylesPath],
    output: {
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
            test: /\.less$/,
            loader: "style-loader!css-loader!less-loader"
        }]
    }
}