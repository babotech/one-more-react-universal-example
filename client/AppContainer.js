import App from './App'
import {IntlableProvider} from 'react-intlable'
import {Provider} from 'react-redux'
import React from 'react'
import store from './store'

const locale = window.__LOCALE__

const messages = window.__LOCALE_DATA__

const AppContainer = () => (
    <IntlableProvider messages={messages} locale={locale}>
        <Provider store={store}>
            <App/>
        </Provider>
    </IntlableProvider>
)

export default AppContainer
