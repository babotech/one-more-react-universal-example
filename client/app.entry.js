import 'normalize.css'

import AppContainer from './AppContainer'
import React from 'react'
import ReactDOM from 'react-dom'

import locales from './locales'
import {ready} from 'react-intlable'

const localeUrl = locales[window.__LOCALE__]

ready(localeUrl, () => {
    ReactDOM.render(<AppContainer />, document.getElementById(`app`))
}, true)
