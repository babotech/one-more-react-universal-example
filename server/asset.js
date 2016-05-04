import config from 'config'
import fs from 'fs'
import path from 'path'

let assetsFile

export default {
    url: (entry, ext) => {
        assetsFile = assetsFile || fs.readFileSync(path.resolve(__dirname, config.source, `webpack-assets.json`))

        const assets = JSON.parse(assetsFile)
        const src = assets[entry][ext]

        return src ? src : ``
    }
}
