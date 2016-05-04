import 'normalize.css'
import './assets/fonts/fonts.css'

import {Link} from 'react-router'
import React from 'react'
import {connect} from 'react-redux'

import styles from './App.css'


const App = ({children}) => {
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
            <h1>Menu</h1>
            <div className={styles.links}>{links}</div>
            <br />
            <h2>
                <a href="/?locale=ru">RU</a>
                <span> / </span>
                <a href="/">EN</a>
            </h2>
            {children}
        </div>
    )
}

export default connect(state => ({ routerState: state.router }))(App)
