import { ReduxRouter, reduxReactRouter } from 'redux-router'
import { compose, createStore } from 'redux'
import { IntlableProvider } from 'react-intlable'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/lib/createBrowserHistory'
import locales from './locales'
import { ready } from 'react-intlable'
import reducer from '../shared/reducer'
import routes from '../shared/routes'


const locale = window.__LOCALE__
const messages = window.__LOCALE_DATA__

const store = compose(
    reduxReactRouter({createHistory})
)(createStore)(reducer, window.__initialState)

const rootComponent = (
    <IntlableProvider messages={messages} locale={locale}>
        <Provider store={store}>
            <ReduxRouter routes={routes}/>
        </Provider>
    </IntlableProvider>
)

const localeUrl = locales[locale]

ready(localeUrl, () => {
    ReactDOM.render(rootComponent, document.getElementById(`app`))
}, true)
