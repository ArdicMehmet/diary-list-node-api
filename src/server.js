import express from 'express';
import cors from 'cors';
import pino from 'pino';
import { env } from './utils/env.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';

const PORT = Number(env('PORT', '3000'));

const logger = pino({
  level: 'info',
});

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

  app.use(router);

  app.use('*', notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
};
