var path = require('path')

var config = require('config')
var glob = require('glob')
var webpack = require('webpack')

var SaveAssetsJsonPlugin = require('assets-webpack-plugin')

var entries = {}
glob.sync(path.join('intl-messages/**/*.locale.js')).forEach(function (filename) {
    var appName = path.basename(filename, '.locale.js')
    entries[appName] = entries[appName] || []
    entries[appName].push('./' + filename)
})

module.exports = {

    context: path.resolve(__dirname, '..'),

    entry: entries,

    target: 'node',

    output: {
        path: config.source,
        filename: '[name].js',
        libraryTarget: 'commonjs2',
        publicPath: config.publicPath
    },

    devtool: '#cheap-module-inline-source-map',

    module: {
        loaders: [
            {
                test: /\.yml$/,
                loaders: ['json', 'yaml']
            }
        ],
        noParse: []
    },
    resolve: {
        extensions: ['', '.js']
    },

    plugins: [
        new SaveAssetsJsonPlugin({
            path: config.source,
            update: true
        })
    ].concat(config.production ? [
        // Production plugins
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({sourceMap: false}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ] : [])
}
