import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import jwt from 'jsonwebtoken';

export const createAccount = async (req: Request, res: Response) => {
    try {
        const { password, email } = req.body;

        // 1. Verificar si el usuario ya existe para no duplicar correos
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            const error = new Error('El usuario ya está registrado');
            return res.status(409).json({ error: error.message });
        }

        // 2. Encriptar la contraseña (Hashing)
        // GenSalt(10) crea una complejidad de encriptado estándar
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);

        // 3. Crear el usuario
        const user = await User.create(req.body);
        
        // 4. Responder (Ocultando el password en la respuesta por seguridad)
        res.status(201).json({ 
            id: user.id,
            name: user.name,
            email: user.email 
        });

    } catch (error) {
        // console.log(error); // Descomenta si necesitas depurar
        res.status(500).json({ error: 'Hubo un error al crear la cuenta' });
    }
};


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // A) Revisar si el usuario existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            const error = new Error('El usuario no existe');
            return res.status(404).json({ error: error.message });
        }

        // B) Revisar si el password es correcto
        // bcrypt.compare compara el texto plano con el hash de la BD
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            const error = new Error('Password incorrecto');
            return res.status(401).json({ error: error.message });
        }

        // C) Generar el Token (JWT)
        // Guardamos el ID del usuario dentro del token (payload)
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '30d' // El token dura 30 días
        });

        res.json(token);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Hubo un error' });
    }
}