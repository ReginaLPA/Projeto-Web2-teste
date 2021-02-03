import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes'
import path from 'path'
import errorHandler from './errors/handler'
import cors from 'cors'
 
import './database/connection'

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(cors())
app.use(routes)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)

app.listen(port, () => {
  console.log(`server runing in port ${port}`)
}) 