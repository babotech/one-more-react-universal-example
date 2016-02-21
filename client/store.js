import {Iterable, fromJS} from 'immutable'
import {applyMiddleware, createStore} from 'redux'

import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

const logger = createLogger({
    predicate: () => DEBUG,
    stateTransformer: (state) => {
        const newState = {}
        for (const i of Object.keys(state)) {
            if (Iterable.isIterable(state[i])) {
                newState[i] = state[i].toJS()
            } else {
                newState[i] = state[i]
            }
        }

        return newState
    },
    actionTransformer: action => {
        return {
            ...action,
            type: action.type.toString()
        }
    }
})

const createStoreWithMiddlewares = applyMiddleware(thunk, logger)(createStore)

const initialState = fromJS(window.__INITITAL_STATE__)

const store = createStoreWithMiddlewares((state) => state, initialState)

export default store
