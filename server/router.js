import './intl-polyfill'
import { match, reduxReactRouter } from 'redux-router/server'
import { IntlableProvider } from 'react-intlable'
import { Provider } from 'react-redux'
import React from 'react'
import { ReduxRouter } from 'redux-router'
import { createMemoryHistory } from 'history'
import { createStore } from 'redux'
import qs from 'query-string'
import reducer from '../shared/reducer'
import render from './render-view'
import routes from './dist/routes'

const localesMessages = {
    ru: require(`./dist/ru`),
    en: require(`./dist/en`)
}

const STATUS_500 = 500
const STATUS_302 = 302
const STATUS_404 = 404
const STATUS_200 = 200


const app = (req, res) => {
    res.write(`<!DOCTYPE html>`)

    const store = reduxReactRouter({
        routes,
        createHistory: createMemoryHistory
    })(createStore)(reducer)

    const query = qs.stringify(req.query)
    const url = `${req.path}${query.length ? `?${query}` : ``}`

    const initialState = {}
    const locale = req.query.locale || `en`
    const messages = localesMessages[locale]

    store.dispatch(match(url, (error, redirectLocation, routerState) => {
        if (error) {
            console.error(`Router error:`, error)
            res.status(STATUS_500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(STATUS_302, redirectLocation.pathname + redirectLocation.search)
        } else if (routerState) {
            res.status(STATUS_200)

            const view = (
                <IntlableProvider messages={messages} locale={locale}>
                    <Provider store={store} key="provider">
                        <ReduxRouter />
                    </Provider>
                </IntlableProvider>
            )

            render(
                view,
                initialState,
                messages,
                locale
            ).pipe(res)
        } else {
            res.status(STATUS_404).send(`Not Found`)
        }
    }))
}

export default app
