import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { stateProps } from '../../redux/store'
import { getPontoHistoricos } from '../../redux/actions/pontosHistoricosActions'
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'

import { FiPlus, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import mapMarkerImg from '../../assets/images/logow.png'
import mapIcon from '../../utils/mapIcon'

import './styles.css'

function PontosHistoricosMap() {

    const dispatch = useDispatch();
    const [latitude, setLatitude] = useState<number | null>()
    const [longitude, setLongitude] = useState<number | null>()

    const {authenticated} = useSelector((state: stateProps) => state.user)
    const {pontoHistoricos} = useSelector((state: stateProps) => state.pontoHistoricos)

    useEffect( () => {
        dispatch(getPontoHistoricos(true))
    }, [])

    useEffect( () => {
        navigator.geolocation.getCurrentPosition( pos => {
            
            setLatitude(pos.coords.latitude)
            setLongitude(pos.coords.longitude)
        })
    }, [])

    
    
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="marker" />

                    <h2>Escolha um ponto Histórico no mapa</h2>

                    <p>E conheça um pouco mais da história de sua cidade.</p>
                </header>

                <footer>
                    <strong>Campinas</strong>
                    <span>São Paulo</span>
                </footer>
                <Link to ="/" className="btn">
                    <FiArrowLeft size={24} color="#FFF" />
              </Link>

            </aside>

            <MapContainer 
                center={[-22.9006421,-47.0972342]} 
                zoom={15} 
                scrollWheelZoom={false}
                style={{width: '100%', height: '100%'}}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

            {pontoHistoricos.map( (pontoHistorico) => (
                <Marker 
                    key={pontoHistorico.id}
                    position={[pontoHistorico.latitude, pontoHistorico.longitude]}
                    icon={mapIcon}
                >
                    <Popup 
                      closeButton={false}
                      minWidth={240}
                      maxWidth={240}
                      className="map-popup"
                    >
                    {pontoHistorico.name}
                    <Link to={`/pontosHistoricos/${pontoHistorico.id}`}>
                      <FiArrowRight size={20} color="#fff" />
                    </Link>
                    </Popup>

              </Marker>      
            ))}

            </MapContainer>

            <Link to="/pontosHistoricos/create" className="create-pontoHistorico">
                <FiPlus size={32} color="#fff" />
            </Link>

            {authenticated &&
                <Link to="/dashboard/pontosHistoricos-registered" className="dashboard">
                    Dashboard
                </Link>
            }
        </div>
    )
}

export default PontosHistoricosMap