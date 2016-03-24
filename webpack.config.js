var path = require('path');
var webpack = require('webpack');
var vueLoader = require('vue-loader');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// define some file paths.
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var VENDER_PATH = path.resolve(ROOT_PATH, 'node_modules');

module.exports = {
  // define 2 entries, one for app, one for venders
  entry: {
    fontAwesome: "font-awesome-webpack!./font-awesome.config.js",
    // bootstrap: "bootstrap-loader",
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
    // make api call redirect to other server
    proxy: {
      "/api/*": "http://localhost:3000"
    }
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, 
    // {
    //   test: /\.js$/,
    //   loader: 'babel',
    //   exclude: /node_modules/
    // }, 
    {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
      include: APP_PATH
    }, {
      test: /\.css$/,
      loaders: ['style', 'css'],
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
    }]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js"),
    // if need jquery, open here to make jquery globaly available. also add jquery to vendor
    // new webpack.ProvidePlugin({
    //   "$": "jquery",
    //   "jQuery": 'jquery'
    // }),
    new HtmlwebpackPlugin({
      template: 'indexTemplate.html', // Load a custom template
      inject: 'body', // Inject all scripts into the body
      filename: '../index.html'
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.vue = {
    loaders: {
      css: ExtractTextPlugin.extract('css'),
      sass: ExtractTextPlugin.extract('css!sass')
    }
  };
  module.exports.devtool = 'source-map';
  // not able to use array.concat, use push instead
  module.exports.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }));
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }));
  module.exports.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
}
