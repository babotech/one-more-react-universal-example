import './intl-polyfill'

import App from './dist/AppServer'
import {IntlableProvider} from 'react-intlable'
import {Provider} from 'react-redux'
import Raw from 'react-raw-html'
import React from 'react'
import ReactDOMStream from 'react-dom-stream/server'
import asset from './asset'

import {createStore} from 'redux'
import {fromJS} from 'immutable'

const localesMessages = {
    ru: require(`./dist/ru`),
    en: require(`./dist/en`)
}

const app = (req, res) => {
    res.write(`<!DOCTYPE html>`)

    const store = createStore(() => fromJS({
        url: `https://github.com/babotech/one-more-react-universal-example`,
        via: `galkinrost`,
        text: `Universal rendering with React`,
        hashtag: `reactjs`
    }))
    const initialState = store.getState()

    let locale = req.params.locale
    let messages = localesMessages[locale]

    if (!messages) {
        locale = `en`
        messages = localesMessages[locale]
    }

    ReactDOMStream.renderToStaticMarkup(
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimal-ui"/>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <title>Universal React/Redux App</title>
                <link href={asset.url(`app`, `css`)} media="all" rel="stylesheet" type="text/css"/>
            </head>
            <body>
                <div
                    id="app"
                    style={{width: `100%`, height: `100%`}}
                    dangerouslySetInnerHTML={{__html:
                        ReactDOMStream.renderToString(
                            <IntlableProvider messages={messages} locale={locale}>
                                <Provider store={store}>
                                    <App />
                                </Provider>
                            </IntlableProvider>
                        )
                    }}
                ></div>
                <Raw.script>
                    {`window.__INITITAL_STATE__ = ${JSON.stringify(initialState)};`}
                    {`window.__LOCALE_DATA__ = ${JSON.stringify(messages)};`}
                    {`window.__LOCALE__ = ${JSON.stringify(locale)};`}
                </Raw.script>
                <script src={asset.url(`app`, `js`)}></script>
            </body>
        </html>
    ).pipe(res)
}

export default app
