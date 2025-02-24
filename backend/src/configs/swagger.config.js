const swaggerJSDoc = require('swagger-jsdoc');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ZenoGo - A RIde Hailing Website API Documentation',
    version: '1.0.0',
    description: 'API Documentation for the Express.js Application',
  },
  servers: [
    {
      url: `http://${process.env.SOURCE}:${process.env.SOURCE_PORT}/api/`,  // Update this with your app's base URL
      //description: 'Local server',
    },
  ],
  components: {
    securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          }
        }
      },
  security: [{
    bearerAuth: []
  }]
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['src/routes/*.js']
    // Path to the API docs
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
