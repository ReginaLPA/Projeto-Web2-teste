import PontoHistorico from "../models/PontosHistoricosModel"
import imagesView from './images_view'

// como os orfanatos serão exibidos no frontend
export default {
    render(pontoHistorico: PontoHistorico) {
        return {
            id: pontoHistorico.id,
            name: pontoHistorico.name,
            latitude: pontoHistorico.latitude,
            longitude: pontoHistorico.longitude,
            about: pontoHistorico.about,
            instructions: pontoHistorico.instructions,
            opening_hours: pontoHistorico.opening_hours,
            open_on_weekends: pontoHistorico.open_on_weekends,
            images: imagesView.renderMany(pontoHistorico.images),
            accepted: pontoHistorico.accepted,
        }
    },

    renderMany(pontoHistoricos: PontoHistorico[]) {
        return pontoHistoricos.map( pontoHistorico => this.render(pontoHistorico))
    }
}