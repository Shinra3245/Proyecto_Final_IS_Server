import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";


const options: swaggerJSDoc.Options = {
    definition: { 
        openapi: "3.0.2",
        tags: [
            {
                name: "Products", 
                description: "Operaciones relacionadas con los productos"
            }
        ],
        info: {
            title: 'REST API Node.js / Express / Typescript',
            version: '1.0.0',
            description: 'API Docs para productos'
        },
    },
    apis: [ './src/router.ts']
        
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions : SwaggerUiOptions = {
    customCss : `
        .topbar-wrapper .link {
            content: url('https://sg.com.mx/sites/default/files/2018-04/LogoITCelaya.png');
            width: 60px;
            height: 150px;
            width: auto;
        }
    `,
    customSiteTitle: "Documentación API - Productos"
    
}

export default swaggerSpec;
export {
    swaggerUiOptions
}