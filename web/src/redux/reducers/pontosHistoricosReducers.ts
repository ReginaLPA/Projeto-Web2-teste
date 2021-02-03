import { CLEAR_PONTOHISTORICO, GET_PONTOHISTORICO, GET_PONTOSHISTORICOS } from "../types"


const initialState = {
     pontoHistoricos: [],
     pontoHistorico: {}
}

interface actionProps {
    type: string
    payload: any
}

export interface  PontoHistoricoProps {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: boolean;
    images: Array<{
        id: number;
        url: string;
    }>
    accepted: boolean;
}

export default function  pontoHistoricosReducer(state = initialState, action: actionProps) {

    switch (action.type) {
        case GET_PONTOSHISTORICOS:
            return {...state,  pontoHistoricos: action.payload}
            
        case GET_PONTOHISTORICO:
            return {...state,  pontoHistorico: action.payload}
        
        case CLEAR_PONTOHISTORICO:
            return {...state,  pontoHistorico: {}}
            
        default: 
        return state
    }
}