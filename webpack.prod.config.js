const MinifyPlugin = require('babel-minify-webpack-plugin');
const webpack = require('webpack');

const baseConfig = require('./webpack.base.config')();
const modernConfig = require('./webpack.base.config')();

baseConfig.plugins.push(new MinifyPlugin());
baseConfig.plugins.push(new webpack.DefinePlugin({
    'process_env': {
        'NODE_ENV': JSON.stringify('production'),
    },
}))
baseConfig.module.rules[1].use[0].options.presets.push([
    'env', {
        targets: {
            browsers: [
                '> 1%',
                'last 2 versions',
                'Firefox ESR',
            ],
        },
    },
]);

modernConfig.output.filename = 'bundle_es6.js';
modernConfig.plugins.push(new MinifyPlugin());
modernConfig.plugins.push(new webpack.DefinePlugin({
    'process_env': {
        'NODE_ENV': JSON.stringify('production'),
    },
}))
modernConfig.module.rules[1].use[0].options.presets.push(['modern-browsers']);

module.exports = [
    modernConfig,
    baseConfig,
];