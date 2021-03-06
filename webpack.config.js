const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
  entry: {
    vendor: ['babel-polyfill', 'lodash'],
    main: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          plugins: ['transform-runtime'],
          presets: ['es2015']
        },
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      }]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Intro to webpack',
      template: 'src/index.html'
    }),
    new UglifyJsPlugin({
      beautify: false,
      mangle: { screw_ie8 : true },
      compress: { screw_ie8: true, warnings: false },
      comments: false
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    })
  ]
}
