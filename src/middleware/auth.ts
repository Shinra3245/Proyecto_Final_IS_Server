import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    // 1. Revisar si envían el token en los Headers
    const bearer = req.headers.authorization
    if(!bearer) {
        const error = new Error('No Autorizado')
        return res.status(401).json({error: error.message})
    }

    // 2. Limpiar el token (quitar la palabra "Bearer ")
    const token = bearer.split(' ')[1]

    try {
        // 3. Verificar si el token es válido usando la palabra secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        // 4. (Opcional) Obtener el usuario de la BD para saber quién es
        if(typeof decoded === 'object' && decoded.id) {
            const user = await User.findByPk(decoded.id, {
                attributes: ['id', 'name', 'email']
            })
            if(user) {
                req.user = user
                next() // ¡Pase usted!
            } else {
                res.status(500).json({error: 'Token No Valido'})
            }
        }
    } catch (error) {
        res.status(500).json({error: 'Token No Valido'})
    }
}