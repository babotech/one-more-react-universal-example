import React from 'react'

import {intlable} from 'react-intlable'
import styles from './Fish.css'
import fish from './fish.jpg'

const Greeting = () => (
    <div className={styles.main}>
        <img src={fish} className={styles.img} />
        <div>Le poisson</div>
    </div>
)

export default intlable(Greeting)
