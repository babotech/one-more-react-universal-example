var path = require('path')

var autoprefixer = require('autoprefixer')
var config = require('config')
var webpack = require('webpack')

var SaveAssetsJsonPlugin = require('assets-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var NpmInstallPlugin = require('npm-install-webpack-plugin')

module.exports = {

    // Enter watch mode, which rebuilds on file change.
    watch: !config.production,

    // Switch loaders to debug mode.
    debug: !config.production,

    context: path.resolve(__dirname, '..'),

    entry: {
        app: [
            path.resolve('client', 'app.entry.js')
        ].concat(config.production ? [] : [
            'webpack-dev-server/client?http://localhost:3001',
            'webpack/hot/only-dev-server'
        ])
    },

    output: {
        path: config.dist,
        filename: config.production ? '[name]-[hash].js' : '[name].js',
        publicPath: config.publicPath
    },

    devtool: '#cheap-module-inline-source-map',

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: [].concat(config.production ? [] : [
                        'react-hmre'
                    ]),
                    plugins: [].concat(config.production ? [
                        'transform-remove-console',
                        'transform-react-inline-elements'
                    ] : [
                        'typecheck'
                    ])
                }
            },
            {
                test: /\.css$/,
                loader: (function getStyleLoaders() {
                    var loaders = [
                        'style',
                        config.production ? 'css?module' : 'css?module&localIdentName=[name]--[local]',
                        'postcss'
                    ]

                    if (config.production) {
                        return ExtractTextPlugin.extract(loaders[0], loaders.slice(1).join('!'))
                    }

                    return loaders.join('!')
                })()
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
    },

    node: {
        net: 'empty',
        tls: 'empty',
        dns: 'empty'
    },

    postcss: [
        autoprefixer({browsers: ['last 2 version']})
    ],

    plugins: [
        new SaveAssetsJsonPlugin({
            path: config.source,
            update: true
        }),
        new webpack.DefinePlugin({
            DEBUG: !config.production,
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ].concat(config.production
        ? [ // Production plugins
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({sourceMap: false}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin('[name]-[hash].css', {
            allChunks: true
        })
    ] : [
        // Development plugins
        new webpack.HotModuleReplacementPlugin(),
        new NpmInstallPlugin(),
        new webpack.ProgressPlugin(function displayCompilationStatistics(percentage, msg) {
            percentage = Math.floor(percentage * 100)
            msg = percentage + '% ' + msg
            if (percentage < 10) {
                msg = ' ' + msg
            }
            console.log('webpack', msg)
        })
    ])
}
