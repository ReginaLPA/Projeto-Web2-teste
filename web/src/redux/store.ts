import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import usersReducer from './reducers/usersReducer'
import pontoHistoricosReducer, { PontoHistoricoProps } from './reducers/pontosHistoricosReducers'

const middleware = [thunk]

const initialState = {}

export interface stateProps {
    user: {
        credentials: {
            id: string,
            email: string,
            name: string,   
        },
        authenticated: boolean,
        error: string
    },
     pontoHistoricos: {
         pontoHistorico: PontoHistoricoProps,
         pontoHistoricos: Array< PontoHistoricoProps> 
    }
}

const reducers = combineReducers({
    user: usersReducer,
     pontoHistoricos:  pontoHistoricosReducer,
})

const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middleware))
)

export default store