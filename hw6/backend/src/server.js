import express, { response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db';
import routes from './routes';
import mongoose from 'mongoose';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', routes);

db.connect();

const port = process.env.port || 4000
app.listen(port, () => 
    console.log(`App listen on port ${port}!`),
)