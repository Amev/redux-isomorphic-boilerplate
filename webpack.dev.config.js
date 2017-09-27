const htmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const baseConfig = require('./webpack.base.config');

baseConfig.devServer = {
    contentBase: path.resolve(__dirname, 'dist/public'),
    hot: true
},

baseConfig.plugins.push(new htmlWebPackPlugin({
    template: path.resolve('./app/assets/index.html'),
}));

baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

baseConfig.devtool = 'source-map';

module.exports = baseConfig;