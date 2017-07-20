var webpack = require('webpack'),
  path = require('path');

module.exports = {
  entry: {
    scripts: './guideline-app/app/ui/app.js'
  },

  output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/dist/',
      filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          { loader: 'html-loader' },
          { loader: 'file-loader' }
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
