var path = require('path')

var config = require('config')
var express = require('express')
var forever = require('forever')
var morgan = require('morgan')
var mkdirp = require('mkdirp')
var proxy = require('proxy-middleware')
var rimraf = require('rimraf')
var url = require('url')
var webpack = require('webpack')

// Recreate dist folder
rimraf.sync(config.dist)
mkdirp.sync(config.dist)

// Recreate source folder
rimraf.sync(config.source)
mkdirp.sync(config.source)

var WebpackDevServer = require('webpack-dev-server')
var webpackConfig = require('../.webpack/webpack.config')
var webpackConfigServer = require('../.webpack/webpack.config.server')
var webpackConfigIntl = require('../.webpack/webpack.config.intl')

var clientCompiler = webpack(webpackConfig)
var serverCompiler = webpack([
    webpackConfigServer,
    webpackConfigIntl
])
var webpackDevServer = new WebpackDevServer(clientCompiler, {
    hot: true,
    inline: true,
    stats: {
        colors: true,
        chunks: false
    },
    publicPath: config.publicPath
})

var webpackDevServerPort = 3001
webpackDevServer.listen(webpackDevServerPort)

var app = express()

app.use('/assets/', proxy(url.parse('http://localhost:' + webpackDevServerPort + '/assets')))
app.use(proxy(url.parse('http://localhost:' + config.port)))

var clientCompilerDone = false
var serverCompilerDone = false


// wait til webpack starts
clientCompiler.plugin('done', onClientCompilerDone)

function onClientCompilerDone() {
    if (!clientCompilerDone) {
        clientCompilerDone = true
        serverCompiler.watch(1000, onServerCompilerDone)
    }
}

function onServerCompilerDone() {
    if (!serverCompilerDone) {
        serverCompilerDone = true
        setTimeout(runApplications, 1000)
    }
}

function runApplications() {
    var child = new (forever.Monitor)(path.resolve(__dirname, 'start.js'), {
        env: {
            NODE_CONFIG_DIR: path.resolve(__dirname, '..', '.config')
        },
        watch: true,
        watchDirectory: path.resolve(__dirname, '..', 'server')
    })

    child.start()

    app.listen(9000, function () {
        console.log('Development server listens on port 9000')
    })
}
