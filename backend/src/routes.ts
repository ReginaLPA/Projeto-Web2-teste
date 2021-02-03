import {Router} from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'
import 'express-async-errors' // mostrar errors em funções assincronas
import 'dotenv/config'

import PontosHistoricosController from './controllers/PontosHistoricosController'
import UsersController from './controllers/UsersControllers'

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/pontoHistoricos/:accepted', PontosHistoricosController.index)
routes.get('/pontoHistorico/:id', PontosHistoricosController.show)
routes.delete('/pontoHistorico/:id', PontosHistoricosController.delete)
routes.post('/pontoHistoricos/accept-response/:id', PontosHistoricosController.acceptPontoHistoricoResponse)
// upload.array(<nome do campo que vai receber as imagens>) = receber varias imagens ao mesmo tempo
routes.post('/pontoHistoricos', upload.array('images'), PontosHistoricosController.create)
routes.put('/pontoHistorico/:id', upload.array('images'), PontosHistoricosController.update)

routes.get('/user/:id', UsersController.getUserData)
routes.post('/register', UsersController.create)
routes.post('/login', UsersController.login)
routes.post('/forget-password', UsersController.forgetPassword)
routes.post('/reset-password', UsersController.resetPassword)

export default routes
