var config = require('config')

require('babel-register')({
    ignore: [
        /AppServer/,// prevent recompilation
        /node_modules/
    ]
})
require('../server/bootstrap')(config.port)
