import React from 'react'

import Greeting from './components/Greeting'
import TwitterButton from './components/TwitterButton'

import styles from './App.css'

const App = () => (
    <div className={styles.app}>
        <Greeting />
        <TwitterButton />
    </div>
)

export default App

