import Raw from 'react-raw-html'
import React from 'react'
import ReactDOMStream from 'react-dom-stream/server'
import asset from './asset'
import serialize from 'serialize-javascript'

export default (component, initialState, messages, locale) => ReactDOMStream.renderToStaticMarkup(
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
                dangerouslySetInnerHTML={{__html: ReactDOMStream.renderToString(component)}}
            ></div>
            <Raw.script>
                {`window.__INITITAL_STATE__ = ${serialize(initialState)};`}
                {`window.__LOCALE_DATA__ = ${serialize(messages)};`}
                {`window.__LOCALE__ = ${serialize(locale)};`}
            </Raw.script>
            <script src={asset.url(`app`, `js`)}></script>
        </body>
    </html>
)
