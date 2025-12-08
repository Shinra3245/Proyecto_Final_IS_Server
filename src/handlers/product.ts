import { Request, Response } from "express"
import Product from "../models/Product.model"
import { NotEmpty } from "sequelize-typescript"

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll({
        order: [
            ['id', 'DESC']
        ]
    })
    res.json({ data: products })
}

export const getProductById = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }
    res.json({ data: product })
}

//funcion acincrona para que no tarde y podamos obtener resultados
export const createProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body)//crea el objeto
    //para almacenar en la base de datos
    //const savedProduct = await product.save() 
    //console.log(req.body)//esta linea extrae el contenido del POST que envia la información
    //con POST podemos enviar datos de los productos
    res.status(201).json({ data: product })// retornamos un objeto, el enviado a la BD
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    // Comprobar que existe
    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }
    // Actualizar producto
    //console.log(req.body)
    await product.update(req.body)
    await product.save()
    res.json({ data: product })

}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    // Comprobar que existe
    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }
    // Actualizar producto
    //console.log(req.body)
    product.availability = !product.dataValues.availability
    await product.save()
    res.json({ data: product })

}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)
    // Comprobar que existe
    if (!product) {
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }
    await product.destroy()
    res.json({ data: 'Producto eliminado' })
}