const path = require('path');
const webpack = require('webpack');
const customConfig = require('./webpack.config.custom.js');
const extend = require('extend');

module.exports = (config, configType) => {
    const mergedConfig = merge(config, customConfig);
    if (configType !== 'PRODUCTION') {
        return mergedConfig;
    } else {
        mergedConfig.plugins.pop();
        mergedConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                screw_ie8: true,
                warnings: false,
                keep_fnames: true
            },
            mangle: { keep_fnames: true },
            output: {
                comments: false,
                screw_ie8: true
            }
        }));
        return mergedConfig;
    }
};

function merge(config, custom) {
    const plugins = config.plugins.concat(custom.plugins || []);
    const loaders = config.module.loaders.concat(custom.module.loaders || []);
    return extend({}, config, custom, {
        devtool: custom.devtool || config.devtool,
        plugins: plugins,
        module: extend({}, config.module, custom.module, {
            loaders: loaders
        }),
        resolve: extend({}, config.resolve, custom.resolve, {
            alias: extend({}, config.alias, (custom.resolve && custom.resolve.alias))
        })
    });
}