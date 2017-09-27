const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const baseConfig = require('./webpack.base.config');

baseConfig.plugins.push(new UglifyJSPlugin());
baseConfig.plugins.push(new webpack.DefinePlugin({
    'process_env': {
        'NODE_ENV': JSON.stringify('production'),
    },
}))

module.exports = baseConfig;