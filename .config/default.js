var path = require('path')

module.exports = {
    dist: path.resolve(__dirname, '..', 'dist'),
    production: false,
    publicPath: '/assets/',
    port: 7000,
    source: path.resolve(__dirname, '..', 'server', 'dist')
}
