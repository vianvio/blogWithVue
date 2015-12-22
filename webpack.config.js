var path = require('path');
var webpack = require('webpack');
var vueLoader = require('vue-loader');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var VENDER_PATH = path.resolve(ROOT_PATH, 'node_modules');

module.exports = {
  // define 2 entries, one for app, one for vender
  entry: {
    fontAwesome: "font-awesome-webpack!./font-awesome.config.js",
    vblog: path.resolve(APP_PATH, 'index.js'),
    vendor: ['vue', 'vue-router', 'lodash'], //['vue', 'vue-router', 'jquery', 'lodash', 'bootstrap', 'materialize-css'],
  },
  // remember to add publicPath, so that the dev server can be auto reloaded.
  output: {
    path: BUILD_PATH,
    publicPath: '/build/',
    filename: '[name].js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
      include: APP_PATH
    }, {
      test: /\.css$/,
      loaders: ['css'],
      include: ROOT_PATH
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }, {
      test: /\.js$/,
      loader: 'strict'
    }]
  },
  // open this for production, or make a new webpack.config.js
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract('css'),
      sass: ExtractTextPlugin.extract('css!sass')
    }
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
    // new webpack.ProvidePlugin({
    //   "$": "jquery",
    //   "jQuery": 'jquery'
    // }),
    new HtmlwebpackPlugin({
      template: 'indexTemplate.html', // Load a custom template
      inject: 'body' // Inject all scripts into the body
    })
  ],
  // make api call redirect to other server
  devServer: {
    proxy: {
      "/api/*": "http://localhost:3000"
    },
  }
};
