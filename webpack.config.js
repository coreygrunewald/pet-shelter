var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var options = {
    entry: {
        'app.js': './src/index.jsx',
        'styles.css': './src/index.scss'
    },
    output: {
        path: './build',
        filename: '[name]',
        publicPath: '/assets/'
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react'],
                    plugins: ['transform-flow-strip-types']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$|\.png|\.jpe?g\|\.gif$/,
                loader: 'file'
            }
        ]
    },
    presets: [
        'react'
    ],
    plugins: [
        new ExtractTextPlugin('styles.css', {
            allChunks: true
        }),
        // new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.DedupePlugin()
    ]
};

module.exports = options;
