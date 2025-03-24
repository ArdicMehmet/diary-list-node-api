import express from 'express';
import cors from 'cors';
/* import pino from 'pino';
 */ import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const PORT = Number(env('PORT', '3001'));

/*const logger = pino({
  level: 'info',
});*/

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Slim Moms API',
      version: '1.0.0',
      description: 'API for Slim Moms application',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routers/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export const SetupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(cookieParser());

  app.get('/', (req, res) => {
    res.write('<html>');
    res.write('<head><title>Node</title></head>');
    res.write(
      '<body><h2>It seems that you are lost. If you need a map, say "Hi!"</h2></body>',
    );
    res.write('</html>');
    return res.end();
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.use('/api', router);
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
