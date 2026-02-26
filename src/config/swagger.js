import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Gimnasio API',
            version: '1.0.0',
            description: 'API para la gestión de salas y reservas de un gimnasio',
            contact: {
                name: 'Soporte API'
            }
        },
        servers: [
            {
                url: 'http://localhost:4000',
                description: 'Servidor de Desarrollo',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    console.log('✅ Documentación Swagger disponible en http://localhost:4000/api-docs');
};