import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {deletePontoHistorico, getPontoHistorico} from '../../../redux/actions/pontosHistoricosActions'
import { stateProps } from '../../../redux/store';

import sorryMarker from '../../../assets/images/logow.png'
import './styles.css'

interface paramsProps {
    id: string
}

function DeletePontoHistorico() {    
    const dispatch = useDispatch();
    const {push} = useHistory();
    const {id} = useParams<paramsProps>();
    
    const {pontoHistorico} = useSelector((state: stateProps) => state.pontoHistoricos)

    useEffect(() => {
        dispatch(getPontoHistorico(id))
    })

    function handleGoToDashboard() {
        dispatch(deletePontoHistorico(id, push))
    }

    if(!pontoHistorico.id) {
        return <p>loading...</p>
    }

    return (
        <main id="page-landing-delete" >
            <div className="delete-page-wrapper">
                <div className="delete-pontoHistorico-info">
                    <h2>Excluir!</h2>
                    <p>Você tem certeza que deseja excluir {pontoHistorico.name}?</p>

                    <button onClick={handleGoToDashboard}>
                        Deletar
                    </button>
                </div>

                <img src={sorryMarker} alt="delete icon" />

            </div>            
        </main>
    )
}

export default DeletePontoHistorico