const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => merge( common(env),
  {
    mode: 'development',
    devtool: 'inline-source-map',

  }
);