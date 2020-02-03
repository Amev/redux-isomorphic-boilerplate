const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const htmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const baseConfig = require('./webpack.base.config')();


const extractLess = new ExtractTextPlugin({
	filename: 'style-[chunkhash].css',
	disable: false
});

baseConfig.mode = 'production';
baseConfig.output.publicPath = '/public/';
baseConfig.output.filename = 'bundle_es6-[chunkhash].js';
baseConfig.plugins.unshift(new CleanWebpackPlugin());
baseConfig.plugins.push(extractLess);
baseConfig.plugins.push(new MinifyPlugin());
baseConfig.plugins.push(new webpack.DefinePlugin({
	'process_env': {
		'NODE_ENV': JSON.stringify('production'),
	},
}));
baseConfig.plugins.push(new htmlWebPackPlugin({
    template: path.resolve('./app/assets/index.html'),
	filename: 'template.html',
    publicPath: '/public/',
}));
baseConfig.module.rules[1].use[0].options.presets.push(['modern-browsers']);
baseConfig.module.rules.shift();
baseConfig.module.rules.unshift({
	test: /\.less$/,
	use: extractLess.extract({
		use: [
			{ loader: 'css-loader' },
			{
				loader: 'postcss-loader',
				options: {
					plugins: loader => [require('autoprefixer')()]
				},
			},
			{ loader: 'less-loader' },
		],
		fallback: 'style-loader',
	}),
});

module.exports = [
	baseConfig,
];