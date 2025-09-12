import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import router from './routes/contactRoute.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { ctrlWrapper } from './utils/ctrlWrapper.js';


export const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || '3000';

    app.use(cors());
    app.use(pinoHttp());
    app.use(express.json());
    app.use('/contacts', router);

    app.use(notFoundHandler);

    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
