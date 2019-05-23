const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackNodeExternals = require('webpack-node-externals');


module.exports = {
  target: "node",
  mode:'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/build'),
  },
  devtool: 'cheap-module-source-map',
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },

    ],
  }
};
