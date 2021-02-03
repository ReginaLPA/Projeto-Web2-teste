import Leaflet from 'leaflet'

import mapMarkerImg from '../assets/images/iconw.png'

const mapIcon = Leaflet.icon({
    iconUrl: mapMarkerImg,
    iconSize: [35, 35],
    iconAnchor: [15, 30],
    popupAnchor: [155, 15]
})

export default mapIcon