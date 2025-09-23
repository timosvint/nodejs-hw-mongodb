import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routerConnect.js';
import cookieParser from "cookie-parser";

export const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || '3000';

    app.use(cors());
    app.use(pinoHttp());
    app.use(express.json());
  app.use(cookieParser());

      app.use(router);

    app.use(notFoundHandler);

    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
