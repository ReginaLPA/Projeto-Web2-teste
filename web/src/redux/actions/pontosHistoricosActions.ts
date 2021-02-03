import api from "../../services/api"

import { GET_PONTOHISTORICO, GET_PONTOSHISTORICOS } from "../types";

export const getPontoHistoricos = (acceptedPontoHistoricos: boolean) => (dispatch: Function) => {

    api.get(`/PontoHistoricos/${acceptedPontoHistoricos}`)
        .then( (res) => {
            dispatch({type: GET_PONTOSHISTORICOS, payload: res.data});        
        })

}

export const getPontoHistorico = (id: string) => (dispatch: Function) => {

    api.get(`/PontoHistorico/${id}`)
        .then( (res) => {
            dispatch({type: GET_PONTOHISTORICO, payload: res.data});        
        })

}

export const createPontoHistorico = (PontoHistoricoData: FormData, push: Function) => (dispatch: Function) => {

    api.post('/PontoHistoricos', PontoHistoricoData)
        .then( () => {
            alert("Ponto Histórico criado com sucesso!");
            push('/app')
            dispatch(getPontoHistoricos(true))
        })
        .catch( (err) => {
            alert("Algo deu errado");
        })
}

export const PontoHistoricoPendingResponse = (id: string, adminResponse: boolean, push: Function) => (dispatch: Function) => {

    api.post(`/PontoHistoricos/accept-response/${id}`, {adminResponse})
        .then( () => {
            dispatch(getPontoHistoricos(true))
            push('/dashboard/pontosHistoricos-registered')
        })
}

export const deletePontoHistorico = (id: string, push: Function) => (dispatch: Function) => {
    api.delete(`/PontoHistorico/${id}`)
        .then( () => {
            dispatch(getPontoHistoricos(true))
            alert("Ponto Histórico deletado com sucesso!!")
            push('/dashboard/pontosHistoricos-registered')
        })
}

export const updatePontoHistorico = (id: string, data: FormData, push: Function) => (dispatch: Function) => {
    api.put(`/PontoHistorico/${id}`, data)
        .then( () => {
            dispatch(getPontoHistoricos(true))
            alert("Ponto Histórico Atualizado com sucesso!")
            push('/dashboard/pontosHistoricos-registered')
        })
}
