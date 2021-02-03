import React, { useEffect } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getPontoHistoricos } from '../../../redux/actions/pontosHistoricosActions'
import { stateProps } from '../../../redux/store'
import { CLEAR_PONTOHISTORICO } from '../../../redux/types'

import AsideAdmin from '../../../components/AsideAdmin'
import mapIcon from '../../../utils/mapIcon'

function PontosHistoricosPendentes() { 
    const {push} = useHistory();
    const dispatch = useDispatch();

    const {pontoHistoricos} = useSelector( (state: stateProps) => state.pontoHistoricos )
    
    useEffect( () => {
        dispatch(getPontoHistoricos(false))
        dispatch({type: CLEAR_PONTOHISTORICO})
    }, [dispatch])
    
    function handleGoToAcceptOrDeclinePontoHistoricoPage(id: number) {
        push(`/dashboard/pontosHistorico-pending/${id}`)
    }

    return (
        <div id="dashboard-container">
            <AsideAdmin />

            <main>
                <div className="dashboard-main-container">
                    <header>
                        <h1>Cadastrados Pendentes</h1>

                        <span>{pontoHistoricos.length} Pontos Históricos</span>
                    </header>

                    <hr />

                    <div className="pontoHistoricos-wrapper">
                        {pontoHistoricos.map(pontoHistorico => (
                            <div key={pontoHistorico.id} className="pontoHistorico-container">
                            <MapContainer
                                center={[-22.9006421,-47.0972342]}
                                zoom={16}
                                style={{width: '100%', height: 200}}
                                dragging={false}
                                touchZoom={false}
                                zoomControl={false}
                                scrollWheelZoom={false}
                                doubleClickZoom={false}
                            >
                                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

                                <Marker interactive={false} icon={mapIcon} position={[pontoHistorico.latitude, pontoHistorico.longitude]} />
                            </MapContainer>

                            <div className="pontoHistorico-footer">
                                <h2>{pontoHistorico.name}</h2>

                                <button onClick={() => handleGoToAcceptOrDeclinePontoHistoricoPage(pontoHistorico.id)}>
                                    <FiArrowRight size={16} color="#15C3D6" />
                                </button>
                                
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
    
}

export default PontosHistoricosPendentes