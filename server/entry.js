import asset from './asset'
import config from 'config'
import express from 'express'
import morgan from 'morgan'
import router from './router'

const app = express()

app.use(morgan(`dev`))
app.use(`/assets`, express.static(config.dist))

app.locals.asset = asset

app.use(router)

module.exports = (port) => {
    app.listen(port, () => {
        console.log(`Server application listens port ${port}`)
    })
}
