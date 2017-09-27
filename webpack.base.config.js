const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.resolve('./app/client.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve('./dist/public'),
    },
    context: path.resolve('./app'),
    resolve: {
        modules: [
            path.resolve('./app'),
            'node_modules',
        ],
    },
    plugins: [
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'react'],
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader',
                ],
            },
        ],
    }
};