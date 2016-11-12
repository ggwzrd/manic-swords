var path = require('path');
var webpack = require('webpack');
var HTMLWebpackPlugin = require('html-webpack-plugin');

var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: path.join(__dirname, 'client', 'index.html'),
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  devtool: 'source-map',
  entry: [
    './client/index'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.NoErrorsPlugin(),
    HTMLWebpackPluginConfig
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: path.join(__dirname, 'client'),
        exclude: [/(node_modules|bower_components)/, /\.test\.jsx?$/],
        loader: 'babel',
        query: {
          presets: ['airbnb', 'react', 'es2015', 'stage-0']
       },
      },
      { test: /\.woff2?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg|png|gif)$/, loader: 'file-loader' },
      { test: /\.(sass|scss)$/, loader: 'style!css!sass'},
      { test: /\.json$/, loader: 'json-loader'}
    ]
  }
};
