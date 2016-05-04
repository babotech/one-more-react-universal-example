import React from 'react'

import {intlable} from 'react-intlable'
import styles from './Fish.css'
import fish from './fish.jpg'

const Greeting = ({formatMessage}) => (
    <div className={styles.main}>
        <img src={fish} className={styles.img} />
        <div>{formatMessage(`fish`)}</div>
    </div>
)

export default intlable(Greeting)
