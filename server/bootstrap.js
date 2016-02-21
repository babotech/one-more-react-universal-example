import './intl-polyfill'

import asset from './asset'
import appRoute from './app'
import config from 'config'
import express from 'express'
import morgan from 'morgan'
import path from 'path'

const app = express()

app.use(morgan(`dev`))
app.use(`/assets`, express.static(config.dist))
app.set(`views`, path.resolve(__dirname, `views`))
app.set(`view engine`, `jade`)

app.locals.asset = asset

app.use(`/:locale`, appRoute)

module.exports = (port) => {
    app.listen(port, () => {
        console.log(`Application listens port ${port}`)
    })
}
