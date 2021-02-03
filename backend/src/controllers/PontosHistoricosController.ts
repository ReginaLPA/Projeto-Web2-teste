import {Request, Response} from 'express'
import fs from 'fs'
import path from 'path'
import {promisify} from 'util'
import * as Yup from 'yup' // o yup é uma biblioteca de validação de dados, como ele não tem um export default vamos fazer uma importação de tudo usando o *
import {getRepository} from 'typeorm' // getRepository = vai determinar todas as operações que formos fazer no DB, criar, deletar, listar, etc. o Repositorio vai deter todas essas regras
import PontoHistorico from '../models/PontosHistoricosModel'
import Image from '../models/ImageModel'

import PontoHistoricoView from '../views/pontosHistoricos_view'

interface pontoHistoricoProps {
  name: string, 
  latitude: number, 
  longitude: number, 
  about: string, 
  instructions: string, 
  opening_hours: string, 
  open_on_weekends: boolean; //converter para boolean 
  images?: Array<{}>,
  accepted: boolean

}

async function validatePontoHistoricoData(data: pontoHistoricoProps) { 
  // criando um schema/interface que nossos pontos historicos deve ter
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    latitude: Yup.number().required(),
    longitude: Yup.number().required(),
    about: Yup.string().required().max(800),
    instructions: Yup.string().required(),
    opening_hours: Yup.string().required(),
    open_on_weekends: Yup.boolean().required(),
    images: Yup.array(
      Yup.object().shape({
        path: Yup.string().required(),
    })
    ),
    accepted: Yup.boolean().required()
  })

  // validação
  await schema.validate(data, {
    abortEarly: false // se ele encontrar um campo que não estiver valido ele imediatamente vai abortar, vamos deixar falso pois queremos a mensagem de todos os campos que não estiverem validos, retornar todos os erros ao mesmo tempo.
  })

}

export default {

  async index(request: Request, response: Response) {
    const {accepted} = request.params

      const  pontoHistoricosRepository = getRepository(PontoHistorico)

      // pegar todos pontos sem parametroys no find para pegar todos
      const  pontoHistoricos = await  pontoHistoricosRepository.find({
        where: {accepted: accepted === "true"},
        relations: ['images'] // nome da coluna relacionada que tem as imagens
      });

      return response.json(PontoHistoricoView.renderMany(pontoHistoricos))
  },

  async show(request: Request, response: Response) {
    const {id} = request.params
    const  pontoHistoricosRepository = getRepository(PontoHistorico)

    // pegar um ponto historico, vai retornar ele ou um erro
    const  pontoHistorico = await  pontoHistoricosRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return response.json(PontoHistoricoView.render(pontoHistorico)) 
  },

  async create(request: Request, response: Response) {
    const {name, latitude, longitude, about, instructions, opening_hours, open_on_weekends} = request.body

    // para entender que o request.files é um array de arquivos
    const requestImages = request.files as Express.Multer.File[];
    
    const images = requestImages.map( image => {
      return { 
          path: image.filename
      }
    })
    
    const  pontoHistoricosRepository = getRepository(PontoHistorico)

    const data = {
      name, 
      latitude, 
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends: open_on_weekends === "true", //converter para boolean 
      images,
      accepted: false
    }

    await validatePontoHistoricoData(data)

    // .create apenas vai deixar pre-criado o repositorio, não vai salvar
    const pontoHistorico =  pontoHistoricosRepository.create(data)
  
    await  pontoHistoricosRepository.save(pontoHistorico);
  
    return response.status(200).json(pontoHistorico)
  },

  async update(request: Request, response: Response) {
    const {name, latitude, longitude, about, instructions, opening_hours, open_on_weekends} = request.body
    const {id} = request.params

    const pontoHistoricosRepository = getRepository(PontoHistorico)
    //const imagesRepository = getRepository(Image)

    const data = {
      name, 
      latitude, 
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends: open_on_weekends === "true", //converter para boolean 
      accepted: true 
    }

    await validatePontoHistoricoData(data)

    // .create apenas vai deixar pre-criado o repositorio, não vai salvar
    const pontoHistorico = await  pontoHistoricosRepository.findOne(id)
    
    // * update images
    // imagesRepository.find({pontoHistorico}).then( async pontoHistoricoImages => {
    //   pontoHistoricoImages.map( image => {
    //     imagesRepository.delete(image.id)
    //     return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'uploads', image.path))
    //   })
      
    //   const requestImages = request.files as Express.Multer.File[];
      
    //   const images = requestImages.map( image => {
    //     return {
    //       path: image.filename,
    //       pontoHistorico
    //     }
    //   })

    //   const image = imagesRepository.create(images)
    //   await imagesRepository.save(image)
    // })

    await  pontoHistoricosRepository.update(id, data)
    return response.status(200).send("Ponto Histórico Atualizado com sucesso")
  },
  
  async delete(request: Request, response: Response) {
    const {id} = request.params
    const pontoHistoricosRepository = getRepository(PontoHistorico)

    const pontoHistorico = await  pontoHistoricosRepository.findOne(id, {
      relations: ['images']
    })

    if(!pontoHistorico) return response.status(404).send('Ponto Histórico não encontrado')

    pontoHistorico.images.map( image => {
      return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'uploads', image.path))
    })

    await  pontoHistoricosRepository.delete(id)

    return response.status(200).send()
  
  },

  async acceptPontoHistoricoResponse(req: Request, res: Response) {
    const {id} = req.params
    const {adminResponse} = req.body
    
    const  pontoHistoricosRepository = getRepository(PontoHistorico)

    const pontoHistorico = await  pontoHistoricosRepository.findOne({id: parseInt(id)})

    if(!pontoHistorico) { return res.status(404).send("Ponto Histórico não encontrado") }

    if(adminResponse) {
      pontoHistorico.accepted = true
      await  pontoHistoricosRepository.save(pontoHistorico)
      return res.status(200).send("Ponto Histórico salvo")
    } else {
      await pontoHistoricosRepository.delete({id: parseInt(id)})
      return res.status(200).send("Ponto Histórico removido")
    }
    
  }
}