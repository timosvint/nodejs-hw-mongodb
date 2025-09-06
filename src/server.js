import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import router from './route/contactRoute.js';

export const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || '3000';

    app.use(cors());
    app.use(pinoHttp());

    app.use('/contacts', router);

    app.use((req, res) => {
        res.status(404).send({
        message: 'Not found',
    });
    });


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
