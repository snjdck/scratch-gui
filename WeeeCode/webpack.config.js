var path = require('path');
var webpack = require('webpack');

var base = {
    devServer: {
        contentBase: path.resolve(__dirname, 'playground'),
        host: '0.0.0.0'
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
};


module.exports = [
    Object.assign({}, base, {
        entry: {
            'weeecode': './src/index.js'
        },
        target:"node-webkit",
        output: {
			library: 'KittenBlock',
			libraryTarget: 'commonjs2',
            path: "../build",
            filename: '[name].js'
        }
    }),

];
