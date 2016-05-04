import 'normalize.css'
import './assets/fonts/fonts.css'

import {Link} from 'react-router'
import React from 'react'
import {connect} from 'react-redux'
import {intlable} from 'react-intlable'

import styles from './App.css'


const App = ({children, formatMessage}) => {
    const links = [
        { pathname: `/`, display: `/`},
        { pathname: `/greeting`, display: `/greeting`},
        { pathname: `/fish`, display: `/fish`}
    ].map((l, i) =>
        <p key={i}>
            <Link to={l}>{l.display}</Link>
        </p>
    )

    return (
        <div className={styles.app}>
            <h1>{formatMessage(`text`)}</h1>
            <p className={styles.desc}>{formatMessage(`desc`)}</p>
            <h3>{formatMessage(`menu`)}</h3>
            <div className={styles.links}>{links}</div>
            <br />
            <h3>
                <a href="/?locale=ru">{formatMessage(`ru`)}</a>
                <span> / </span>
                <a href="/">{formatMessage(`en`)}</a>
            </h3>
            {children}
        </div>
    )
}

export default connect(state => ({ routerState: state.router }))(intlable(App))
