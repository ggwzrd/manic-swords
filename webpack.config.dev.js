var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './client/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: path.join(__dirname, 'client'),
        exclude: [/(node_modules|bower_components)/, /\.test\.jsx?$/],
        loader: 'babel',
        query: {
          presets: ['airbnb', 'react', 'es2015', 'stage-0'],
          plugins: [[
            'react-transform', {
              transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module']
            }]
          }]]
        },
      },
      { test: /\.woff2?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg|png|gif)$/, loader: 'file-loader' },
      { test: /\.(sass|scss)$/, loader: 'style!css!sass'},
      { test: /\.json$/, loader: 'json-loader'}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};
