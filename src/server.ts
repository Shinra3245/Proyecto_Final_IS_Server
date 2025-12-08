import express from 'express'
import colors from 'colors'
import cors, { CorsOptions } from 'cors' 
import morgan from 'morgan'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'
import router from './router'
import db from './config/db'


// Conexión a la BD
export async function connectDB(){
    try{
        await db.authenticate()//autentifica la conexión 
        await db.sync()//sincroniza los modelos, crea tablas si no existen 
        //console.log(colors.bgGreen.white('Conexión exitosa a la BD '))
    }catch(error){
        console.log(error)
        console.log(colors.bgRed.white('Hubo un errorcillo al conectar la BD'))
    }
}
connectDB()// Manda llamar la función para conectarnos a la BD

// Instancia de express
const server = express()


const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        if (origin === process.env.FRONTEND_URL ) {
            callback(null, true)
        } else {
            callback(new Error('No permitido por CORS'))
        }
    }
}
       


server.use(cors(corsOptions))

// Leer datos de formularios, recupera la info enviada 
server.use(express.json())

server.use(morgan('dev'))

//filtra la accion http mediante esta linea, tambien se puede camiar la ruta
server.use('/api/productos', router)

// Ruta de prueba
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions) )


export default server
