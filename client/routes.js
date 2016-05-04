import App from '../client/App'
import Fish from '../client/components/Fish'
import Greeting from '../client/components/Greeting'
import React from 'react'
import {Route} from 'react-router'

export default (
    <Route path="/" component={App}>
        <Route path="greeting" component={Greeting} />
        <Route path="greeting/:id" component={Greeting} />
        <Route path="fish" component={Fish} />
    </Route>
)
