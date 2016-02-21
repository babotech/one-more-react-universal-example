import App from './dist/AppServer'
import {IntlableProvider} from 'react-intlable'
import {Provider} from 'react-redux'
import React from 'react'

import {createStore} from 'redux'
import {fromJS} from 'immutable'
import {renderToString} from 'react-dom/server'

const localesMessages = {
    ru: require(`./dist/ru`),
    en: require(`./dist/en`)
}

const app = (req, res) => {
    const store = createStore(() => fromJS({
        url: `https://github.com/babotech/one-more-react-universal-example`,
        via: `galkinrost`,
        text: `Universal rendering with React`,
        hashtag: `reactjs`
    }))

    let locale = req.params.locale

    let messages = localesMessages[locale]

    if (!messages) {
        locale = `en`
        messages = localesMessages[locale]
    }

    const html = renderToString(
        <IntlableProvider messages={messages} locale={locale}>
            <Provider store={store}>
                <App />
            </Provider>
        </IntlableProvider>
    )

    const initialState = store.getState()

    res.render(`app`, {
        html,
        initialState,
        locale,
        messages
    })
}

export default app
