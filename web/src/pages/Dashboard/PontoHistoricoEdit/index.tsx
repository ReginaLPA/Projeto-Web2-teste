import React, {ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvent} from 'react-leaflet'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { stateProps } from '../../../redux/store'
import { getPontoHistorico, updatePontoHistorico} from '../../../redux/actions/pontosHistoricosActions'

import { FiPlus, FiX} from 'react-icons/fi'
import AsideAdmin from '../../../components/AsideAdmin'
import mapIcon from '../../../utils/mapIcon'

import './styles.css'

interface ParamsProps {
    id: string;
}

interface imageProps {
    id: number;
    url: string;
}

function PontoHistoricoConfirm() {
    const dispatch = useDispatch();
    const {push} = useHistory();
    const {id} = useParams<ParamsProps>();
    
    const {pontoHistorico} = useSelector((state: stateProps) => state.pontoHistoricos)

    const [name, setName] = useState('')
    const [about, setAbout] = useState('')
    const [instructions, setInstructions] = useState('')
    const [openingHours, setOpeningHours] = useState('')
    const [openOnWeekends, setOpenOnWeekends] = useState(true)
    
    const [latitude, setLatitude] = useState<number | null>()
    const [longitude, setLongitude] = useState<number | null>()

     const [images, setImages] = useState<File[]>([])
     const [previewImages, setPreviewImages] = useState<imageProps[]>([]);

    useEffect( () => {
        dispatch(getPontoHistorico(id))
    }, [id, dispatch])

    useEffect( () => {
        if(pontoHistorico.id) {
            setName(pontoHistorico.name)
            setAbout(pontoHistorico.about)
            setInstructions(pontoHistorico.instructions)
            setOpeningHours(pontoHistorico.opening_hours)
            setOpenOnWeekends(pontoHistorico.open_on_weekends)
            setLatitude(pontoHistorico.latitude)
            setLongitude(pontoHistorico.longitude)
            setPreviewImages(pontoHistorico.images)

            

        }
    },[pontoHistorico])

    //remove imagens
    function removeImageFromPreviewImages(id: number) {
        setPreviewImages(
            previewImages.filter( image => image.id !== id)
        )
    }
/*
    // todo, update images
     function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
        if(!event.target.files) {
            return;
        }
        const selectedImages = Array.from(event.target.files)
       setImages(selectedImages)
        
        const selectedFilesImagesPreview = selectedImages.map( image => {
            return URL.createObjectURL(image)
         })

        // todo, display images preview and upload to update
       setPreviewImages(selectedFilesImagesPreview)
     }*/

     
     

    function handleEditpontoHistorico(e: FormEvent) {
        e.preventDefault();
    
        const data = new FormData();

        data.append('name', name);
        data.append('about', about);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('instructions', instructions);
        data.append('opening_hours', openingHours);
        data.append('open_on_weekends', String(openOnWeekends));

         images.forEach( image => {
            data.append('images', image)
        })

        dispatch(updatePontoHistorico(id, data, push))
    }

    function toggleOpenOnWeekends() {
        setOpenOnWeekends(!openOnWeekends)
    }

    function MinimapBounds() {
        const onClick = useCallback(
          (e) => {   
            setLatitude(e.latlng.lat)
            setLongitude(e.latlng.lng)
            },
          [],
        )
        useMapEvent('click', onClick)

        return null
    }
    
    if(!pontoHistorico.id || !latitude || !longitude) {
        return <p>Loading...</p>
    }

    return(
        <div id="page-create-PontoHistorico">
            <AsideAdmin />

            <main>

                <form onSubmit={handleEditpontoHistorico} className="PontoHistorico-details">
                    <h2>Dados</h2>

                    <hr />
                        
                    <div className="map-container">
                        <MapContainer
                            center={[-22.9006421,-47.0972342]}
                            zoom={16}   
                            style={{width: '100%', height: 200}}
                        >
                            <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
                      
                            <MinimapBounds />
                                {latitude && longitude && (
                                    <Marker position={[latitude, longitude]} icon={mapIcon}/>
                                )}
                        </MapContainer>
                        
                    </div>

                    <fieldset>

                    <div className="input">
                        <label htmlFor="name">Nome</label>
                        <input 
                         type="text" 
                         name="name" 
                         value={name}
                         onChange={ e => setName(e.target.value)}
                        />
                    </div>

                    <div className="textarea">
                        <label htmlFor="Sobre">Sobre <span>máximo de 800 caracteres</span></label>
                        <textarea 
                         rows={5} 
                         name="about" 
                         value={about}
                         onChange={e => setAbout(e.target.value)}
                        />
                    </div>

                    <div className="images-section">
                        <label>Fotos</label>
                        
                        <div className="images-container">

                            {previewImages.map( image => (
                                <div key={image.id} className="image-wrapper">
                                    <img src={image.url} alt="pontoHistorico" />
                                    <FiX size={16} color="red" className="image-remove-icon" onClick={() => removeImageFromPreviewImages(image.id)} />
                                </div>
                            ) )}
                            
                            <label htmlFor="image[]" className="upload-image">
                                <FiPlus size={24} color="#15b6d6"/>
                            </label>

                        </div>
                        <input
                            type="file" 
                            multiple 
                            id="image[]"
                            //onChange={handleSelectImages}
                            />
                            
                        
                    </div>
                        
                    <h2>Visitação</h2>
                    <hr />

                    <div className="textarea">
                        <label htmlFor="instructions">Instruções</label>
                        <textarea 
                         rows={5} 
                         name="instructions" 
                         value={instructions}
                         onChange={ e => setInstructions(e.target.value)}
                        />
                    </div>
                    
                    <div className="input">
                        <label htmlFor="opening-hours">Horário das visitas</label>
                        <input 
                         type="text" 
                         name="opening-hours" 
                         value={openingHours}                         
                         onChange={ e => setOpeningHours(e.target.value)}
                        />
                    </div>
                    
                    <div className="open-on-weekends">
                        <p>Precisa agendamento?</p>
                        <div className="switch" onClick={() => toggleOpenOnWeekends()}>
                            <input type="checkbox" checked={openOnWeekends} readOnly/>
                            <span className="slider round" />
                        </div>
                    </div>
                    
                    <button className="button" type="submit" >
                        Confirmar
                    </button>

                </fieldset>

                </form>
            </main>
        </div>
    )
}

export default PontoHistoricoConfirm