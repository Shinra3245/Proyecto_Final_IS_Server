import colors from 'colors'
import server from './server'


const port = parseInt(process.env.PORT || '4000', 10)

server.listen(port, '0.0.0.0', () => {
    console.log(colors.cyan(`REST API funcionando en el puerto ${port}`))
})