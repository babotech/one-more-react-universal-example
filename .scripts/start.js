var config = require('config')

require('babel-register')({
    ignore: [
        /routes/,// prevent recompilation
        /node_modules/
    ]
})
require('../server/entry')(config.port)
