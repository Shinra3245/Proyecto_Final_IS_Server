import { Router } from 'express'
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product'
import { handleInputErrors } from './middleware'
import { createAccount, login } from './handlers/user';
import { authenticate } from './middleware/auth'


const router = Router()
/** 
 *@swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: ID del producto
 *                      example: 2
 *                  name:
 *                      type: string
 *                      description: Nombre del producto
 *                      example: "Mouse Gamer"
 *                  price:
 *                      type: number
 *                      description: Precio del producto
 *                      example: 350.5
 *                  availability:
 *                      type: boolean
 *                      description: Disponibilidad del producto
 *                      example: true
 */


// Routing


/**
 * @swagger
 * /api/productos:
 *      get:
 *          summary: Obtener todos los productos
 *          tags:
 *               - Products
 *          description: Retorna una lista con todos los productos
 *          responses: 
 *              200:
 *                  description: respuesta correcta
 *                  content:
 *                      application/json:
 *                          schema:
 *                             type: array
 *                             items:
 *                                  $ref: '#/components/schemas/Product'
 * 
 */

router.get('/', getProducts)



/** 
 * @swagger
 * /api/productos/{id}:
 *  get:
 *      summary: Obtener un producto por ID
 *      tags:
 *           - Products
 *      description: Retorna un producto específico según su ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID del producto a obtener
 *          required: true
 *          schema:
 *              type: integer
 *      responses: 
 *         200:
 *             description: respuesta correcta
 *             content:
 *                 application/json:
 *                     schema:
 *                        $ref: '#/components/schemas/Product'
 *         404:
 *             description: Producto no encontrado
 *         400:
 *             description: ID inválido
 */

//edpoint de producto por id
router.get('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductById
)// routing dinamico, el id se coloca solo


/**
 * @swagger
 * /api/productos:
 *  post:
 *      summary: Crear un nuevo producto
 *      tags:
 *          - Products
 *      description: Crea un nuevo producto con el nombre y precio proporcionados
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Teclado Mecánico"
 *                          price:
 *                              type: number
 *                              example: 120.75
 * 
 *      responses:
 *          201:
 *              description: Producto actualizado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Datos inválidos
 * 
 */
router.post('/',authenticate,
    // Validación
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacío'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacío')
        .custom(value => value > 0).withMessage('Precio no valido'),
    handleInputErrors,
    createProduct
)


/**
 * @swagger
 * /api/productos/{id}:
 *  put:
 *      summary: Actualizar un producto existente
 *      tags:
 *          - Products
 *      description: Actualiza el nombre, precio y disponibilidad de un producto existente por su ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID del producto a obtener
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Teclado Mecánico"
 *                          price:
 *                              type: number
 *                              example: 120.75
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *         200:
 *             description: Producto actualizado exitosamente
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/Product'
 *         400:
 *             description: Datos inválidos
 *         404:
 *             description: Producto no encontrado
 * 
 */

router.put('/:id',
    param('id').isInt().withMessage('ID no valido'),
    body('name')
        .notEmpty().withMessage('El nombme del producto no puede ir vacío'),
    body('price')
        .isNumeric().withMessage('Valor no valido')
        .notEmpty().withMessage('El precio del producto no puede ir vacío')
        .custom(value => value > 0).withMessage('Precio no valido'),
    body('availability')
        .isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updateProduct
)

/**
 * @swagger
 * /api/productos/{id}:
 *  patch:
 *      summary: Actualizar la disponibilidad de un producto
 *      tags:
 *          - Products
 *      description: Actualiza únicamente la disponibilidad de un producto existente por su ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID del producto a obtener
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *         200:
 *             description: Respuesta Correcta
 *             content:
 *                 application/json:
 *                     schema:
 *                         $ref: '#/components/schemas/Product'
 *         400:
 *             description: Datos inválidos
 *         404:
 *             description: Producto no encontrado
 *          
 * 
 * 
 */


router.patch('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability
)

/**
 * @swagger
 * /api/productos/{id}:
 *  delete:
 *       summary: Eliminar un producto por ID
 *       tags:
 *           - Products
 *       description: Elimina un producto existente por su ID
 *       parameters:
 *         - in: path
 *           name: id
 *           description: ID del producto a eliminar
 *           required: true
 *           schema:
 *               type: integer
 *       responses:
 *          200:
 *              description: Producto eliminado exitosamente
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: "Producto eliminado"
 *          400:
 *              description: ID inválido
 *          404:
 *              description: Producto no encontrado
 * 
 */


router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProduct)

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      summary: Crea un nuevo usuario
 *      tags:
 *          - Authentication
 *      description: Registra un nuevo usuario en la base de datos
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *      properties:
 *          name:
 *              type: string
 *              example: "Tu Nombre"
 *          email:
 *              type: string
 *              example: "correo@correo.com"
 *          password:
 *              type: string
 *              example: "password123"
 *          responses:
 *              201:
 *                  description: Usuario creado exitosamente
 *              400:
 *                  description: Error en los datos enviados
 *              409:
 *                  description: El usuario ya existe
 */
router.post('/auth/register',
    body('name')
        .notEmpty().withMessage('El nombre no puede ir vacío'),
    body('email')
        .isEmail().withMessage('E-mail no válido'),
    body('password')
        .isLength({ min: 8 }).withMessage('El password debe ser de al menos 8 caracteres'),
    handleInputErrors,
    createAccount
)

router.post('/auth/login',
    body('email').isEmail().withMessage('El email es obligatorio'),
    body('password').notEmpty().withMessage('El password es obligatorio'),
    handleInputErrors,
    login
);

export default router