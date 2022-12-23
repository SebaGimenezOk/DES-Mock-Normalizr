
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import MockRoutes from './src/routes/test.routes.js';
import logger from 'morgan';



const app = express();

app.use(express.json());
app.use(express.urlencoded(({ extended: true })));
app.use(logger('dev'));
app.use('/api/usuarios', new MockRoutes());

export default app;

