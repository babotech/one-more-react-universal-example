import React from 'react'

import {intlable} from 'react-intlable'
import styles from './Greeting.css'

const Greeting = ({formatMessage}) => (
    <h1 className={styles.greeting}>
        {formatMessage(`greeting`)}
    </h1>
)

export default intlable(Greeting)
