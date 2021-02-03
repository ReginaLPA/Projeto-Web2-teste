import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import {MapContainer, TileLayer, Marker} from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux';
import { getPontoHistorico } from '../../redux/actions/pontosHistoricosActions';
import { stateProps } from '../../redux/store';

import { FiClock, FiInfo } from "react-icons/fi";
//import { FaWhatsapp } from 'react-icons/fa'
import Aside from '../../components/Aside';
import mapIcon from '../../utils/mapIcon'

import './styles.css'

interface pontoHistoricoParams {
    id: string;
}

function PontosHistoricosMap() {
    const params = useParams<pontoHistoricoParams>();
    const dispatch = useDispatch();

    const {pontoHistorico} = useSelector((state: stateProps) => state.pontoHistoricos)
    const [activeImageIndex, setActiveImageIndex] = useState(0)

    useEffect( () => {
        dispatch(getPontoHistorico(params.id))
    }, [params.id, dispatch])
    
    if(!pontoHistorico.id || (!pontoHistorico.latitude && !pontoHistorico.longitude)) {
        return <p>Loading...</p>
    }

    return (
    <div id="page-pontoHistorico">
       
       <Aside />

        <main>
            <div className="pontoHistorico-details">
                <img src={pontoHistorico.images[activeImageIndex].url} alt={pontoHistorico.name} />

                <div className="images">
                    {pontoHistorico.images.map( (image, index) => (
                        <button 
                            key={image.id} 
                            className={activeImageIndex === index ? "active" : ""} 
                            type="button"
                            onClick={() => {setActiveImageIndex(index)}}
                        >
                            <img src={image.url} alt={image.url} />
                        </button>
                    ))}

                </div>

                <div className="pontoHistorico-details-content"> 
                    <h1>{pontoHistorico.name}</h1>
                    <p>{pontoHistorico.about}</p>

                    <div className="map-container">
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

                        <a href={`https://www.google.com/maps/place/${pontoHistorico.latitude},${pontoHistorico.longitude}`} target="_blank" rel="noopener noreferrer">
                            Ver rotas no Google Maps
                        </a>
                    </div>

                    <hr />

                    <h2>Instruções para visita</h2>
                    <p>{pontoHistorico.instructions}</p>

                    <div className="open-details">
                        <div className="hour">
                            <FiClock size={32} color="#29B6D1"/>
                            {pontoHistorico.opening_hours}
                        </div>
                       
                        {pontoHistorico.open_on_weekends ? (
                            <div className="open-on-weekends">
                                <FiInfo size={32} color="#39CC83" />
                                Precisa Agendamento? <br />
                                
                            </div>
                        ) : (
                            <div className="open-on-weekends dont-open">
                                <FiInfo size={32} color="#FF669D" />
                                Não Precisa Agendamento? <br />
                            
                            </div>
                        )}
                    </div>

                    {/*<button className="button">
                        <FaWhatsapp size={20} color="#fff" />
                        Entrar em contato
                        </button>*/}
                      
                </div>
            </div>
        </main>

    </div>
    )
}

export default PontosHistoricosMap