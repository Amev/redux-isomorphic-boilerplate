const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MinifyPlugin = require('babel-minify-webpack-plugin');
const webpack = require('webpack');

const baseConfig = require('./webpack.base.config')();
const modernConfig = require('./webpack.base.config')();

const extractLess = new ExtractTextPlugin('bundle.css');

baseConfig.plugins.push(new MinifyPlugin());
baseConfig.plugins.push(new webpack.DefinePlugin({
    'process_env': {
        'NODE_ENV': JSON.stringify('production'),
    },
}));
baseConfig.plugins.push(extractLess);
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
baseConfig.module.rules[0] = {
    test: /\.less$/,
    use: extractLess.extract({
        use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: loader => [require('autoprefixer')()]
                },
            },
            { loader: 'less-loader' },
        ],
    }),
};

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