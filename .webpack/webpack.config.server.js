var path = require('path')

var autoprefixer = require('autoprefixer')
var config = require('config')
var webpack = require('webpack')

module.exports = {

    watch: config.production,

    context: path.resolve(__dirname, '..'),

    entry: {
        app: path.resolve('client', 'App.js')
    },

    target: 'node',

    output: {
        path: config.source,
        filename: 'AppServer.js',
        libraryTarget: 'commonjs2',
        publicPath: config.publicPath
    },

    devtool: '#cheap-module-inline-source-map',

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    plugins: [
                        'transform-remove-console'
                    ]
                }
            },
            {
                test: /\.css$/,
                loaders: [
                    'isomorphic-style',
                    config.production ? 'css?module' : 'css?module&localIdentName=[name]--[local]',
                    'postcss'
                ]
            },
            {
                test: /\.(png|swf|jpg|otf|eot|ttf|woff|woff2|svg|json)(\?.*)?$/,
                loader: 'file?name=[hash].[ext]'
            }
        ]
    },

    resolve: {

        extensions: ['', '.js'],

        modulesDirectories: [
            'node_modules'
        ]

    }

}
