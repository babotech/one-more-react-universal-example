import React from 'react'

import {intlable} from 'react-intlable'
import styles from './Greeting.css'

const Greeting = ({formatMessage}) => (
    <div className={styles.main}>
        <h1 className={styles.greeting}>
            {formatMessage(`greeting`)}
        </h1>
    </div>
)

export default intlable(Greeting)
