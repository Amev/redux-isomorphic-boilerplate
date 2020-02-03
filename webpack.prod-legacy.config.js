const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const htmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const legacyConfig = require('./webpack.base.config')();


legacyConfig.mode = 'production';
legacyConfig.output.filename = 'bundle_legacy-[chunkhash].js';
legacyConfig.output.publicPath = '/public/';
legacyConfig.plugins.push(new MinifyPlugin());
legacyConfig.plugins.push(new webpack.DefinePlugin({
	'process_env': {
		'NODE_ENV': JSON.stringify('production'),
	},
}));
legacyConfig.plugins.push(new htmlWebPackPlugin({
    template: path.resolve('dist/public/template.html'),
	filename: 'template.html',
    publicPath: '/public/',
}));
legacyConfig.plugins.push(new HtmlBeautifyPlugin({
    config: {
        html: {
            end_with_newline: false,
            indent_size: 4,
            indent_with_tabs: false,
            preserve_newlines: true,
        }
    },
    replace: [
        {
            test: 'type="text/javascript" src="/public/bundle_es6',
            with: 'type="module" src="/public/bundle_es6'
        },
        {
            test: 'type="text/javascript" src="/public/bundle_legacy',
            with: 'nomodule src="/public/bundle_legacy'
        },
    ]
}));
legacyConfig.module.rules[1].use[0].options.presets.push([
	'@babel/preset-env', {
		targets: {
			browsers: [
				'Chrome >= 60',
				'Safari >= 10',
				'Firefox >= 54',
				'Edge >= 15',
			],
		},
	},
]);

module.exports = [
	legacyConfig,
];