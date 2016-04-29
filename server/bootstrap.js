import './intl-polyfill'

import appRoute from './app'
import asset from './asset'
import config from 'config'
import express from 'express'
import morgan from 'morgan'

const app = express()

app.use(morgan(`dev`))
app.use(`/assets`, express.static(config.dist))

app.locals.asset = asset

app.use(`/:locale`, appRoute)

module.exports = (port) => {
    app.listen(port, () => {
        console.log(`Server application listens port ${port}`)
    })
}
