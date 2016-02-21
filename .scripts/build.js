var config = require('config')
var mkdirp = require('mkdirp')
var rimraf = require('rimraf')

// Recreate dist folder
rimraf.sync(config.dist)
mkdirp.sync(config.dist)

// Recreate source folder
rimraf.sync(config.source)
mkdirp.sync(config.source)

var webpack = require('webpack')
var webpackConfig = require('../.webpack/webpack.config.js')
var webpackConfigServer = require('../.webpack/webpack.config.server')
var webpackConfigIntl = require('../.webpack/webpack.config.intl')

webpack([
    webpackConfig,
    webpackConfigServer,
    webpackConfigIntl
]).run(function (err, stats) {
    if (err) {
        throw err
    }
    var statsJson = stats.toJson()
    if (stats.hasErrors()) {
        throw statsJson.errors
    }
    console.log(stats.toString({
        timings: true,
        colors: true
    }))
})
