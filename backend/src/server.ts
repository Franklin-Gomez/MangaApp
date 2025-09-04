import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import MangaRoute from './routes/MangaRoutes';


export const app = express();

app.use( cors() );
app.use( express.json() );

app.use('/api/mangas',  MangaRoute );
