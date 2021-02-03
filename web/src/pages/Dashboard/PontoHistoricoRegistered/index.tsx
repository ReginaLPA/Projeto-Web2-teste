import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { stateProps } from '../../../redux/store'
import { getPontoHistoricos } from '../../../redux/actions/pontosHistoricosActions'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { CLEAR_PONTOHISTORICO} from '../../../redux/types'

import AsideAdmin from '../../../components/AsideAdmin'
import mapIcon from '../../../utils/mapIcon'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

import './styles.css'

function PontoHistoricoRegistered() {
    const {push} = useHistory();
    const dispatch = useDispatch();

    const {pontoHistoricos} = useSelector( (state: stateProps) => state.pontoHistoricos )
    
    useEffect( () => {
        dispatch(getPontoHistoricos(true))
        dispatch({type: CLEAR_PONTOHISTORICO})
    }, [dispatch])

    function handleEditpontoHistorico(id: number) {
        push(`/dashboard/pontosHistoricos-registered/edit/${id}`)
        
    }

    function handleDeletepontoHistorico(id: number) {
        push(`/dashboard/pontosHistoricos-registered/delete/${id}`)
    }

    return (
        <div id="dashboard-container">
            <AsideAdmin />

            <main>
                <div className="dashboard-main-container">
                    <header>
                        <h1>Pontos Históricos Cadastrados</h1>

                        <span>{pontoHistoricos.length} Pontos Históricos</span>
                    </header>

                    <hr />

                    <div className="pontoHistoricos-wrapper">
                        {pontoHistoricos.map( pontoHistorico => (
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

                                <div className="pontoHistorico-options">
                                    <button onClick={() => handleEditpontoHistorico(pontoHistorico.id)}>
                                        <FiEdit size={16} color="#15C3D6" />
                                    </button>
                                    <button onClick={() => handleDeletepontoHistorico(pontoHistorico.id)}>
                                        <FiTrash2 size={16} color="#15C3D6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PontoHistoricoRegistered