import {  useEffect } from 'react'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { stateProps } from '../../../redux/store'
import { getPontoHistorico,  PontoHistoricoPendingResponse } from '../../../redux/actions/pontosHistoricosActions'

import { FiXCircle, FiCheck } from 'react-icons/fi'
import AsideAdmin from '../../../components/AsideAdmin'
import mapIcon from '../../../utils/mapIcon'

import './styles.css'

interface ParamsProps {
    id: string;
}

function PontoHistoricoConfirm() {
    const dispatch = useDispatch();
    const {push} = useHistory();
    const {id} = useParams<ParamsProps>();
    
    const {pontoHistorico} = useSelector((state: stateProps) => state.pontoHistoricos)

    useEffect( () => { 
        dispatch(getPontoHistorico(id))
    }, [id, dispatch])

    function handleAdminResponseTopontoHistoricoPending(adminResponse: boolean) {
        dispatch(PontoHistoricoPendingResponse(id, adminResponse, push))
    }

    if(!pontoHistorico.id || (!pontoHistorico.latitude || !pontoHistorico.longitude)) {
        return <p>Loading...</p>
    }

    return(
        <div id="page-create-PontoHistorico">
            <AsideAdmin />

            <main>

                <div className="PontoHistorico-details">
                    <h2>Dados</h2>

                    <hr />

                    <div className="map-container">
                        <MapContainer
                            center={[-22.9006421,-47.0972342]}
                            zoom={16}   
                            dragging={false}
                            touchZoom={false}
                            zoomControl={false}
                            scrollWheelZoom={false}
                            doubleClickZoom={false}
                            style={{width: '100%', height: 200}}
                        >
                            <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
                      
                            <Marker position={[pontoHistorico.latitude, pontoHistorico.longitude]} icon={mapIcon}/>
                      
                        </MapContainer>
                        
                    </div>

                <fieldset>

                    <div className="input">
                        <label htmlFor="name">Nome</label>
                        <input type="text" name="name" value={pontoHistorico.name} readOnly/>
                    </div>

                    <div className="textarea">
                        <label htmlFor="Sobre">Sobre <span>máximo de 800 caracteres</span></label>
                        <textarea rows={5} name="about" value={pontoHistorico.about} readOnly/>
                    </div>

                        <div className="images-section">
                            <label>Fotos</label>
                            
                            <div className="images-container">
 
                                {pontoHistorico.images.map( image => (
                                    <img key={image.id} src={image.url} alt="ImagepontoHistorico" />
                                ) )}

                            </div>
                        </div>
                        
                        <h2>Visitação</h2>
                        <hr />

                        <div className="textarea">
                            <label htmlFor="instructions">Instruções</label>
                            <textarea 
                                rows={5} 
                                name="instructions" 
                                value={pontoHistorico.instructions}
                                readOnly
                            />
                        </div>
                        
                        <div className="input">
                            <label htmlFor="opening-hours">Horário das visitas</label>
                            <input 
                            type="text" 
                            name="opening-hours" 
                            value={pontoHistorico.opening_hours} 
                            readOnly 
                            />
                        </div>
                        
                        <div className="open-on-weekends">
                            <p>Precisa agendamento?</p>
                            <div className="switch" >
                                <input type="checkbox" checked={pontoHistorico.open_on_weekends} readOnly/>
                                <span className="slider round" />
                            </div>
                        </div>
                        
                        <div className="pontoHistorico-pending-buttons">
                            <button className="button-decline-pontoHistorico" onClick={ () => handleAdminResponseTopontoHistoricoPending(false)}>
                                <FiXCircle size={20} color="#fff" style={{marginRight: "10px"}} />
                                Recusar
                            </button>
                            <button className="button-accept-pontoHistorico" onClick={ () => handleAdminResponseTopontoHistoricoPending(true)}>
                                <FiCheck size={20} color="#fff" style={{marginRight: "10px"}} />
                                Aceitar
                            </button>
                        </div>

                  </fieldset>

                </div>
            </main>
        </div>
    )
}

export default PontoHistoricoConfirm