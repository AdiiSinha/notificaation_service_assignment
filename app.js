import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import notificationRoutes from './routes/notification.routes';
require('dotenv').config();

const app = express();
app.use(json());
app.use('/api', notificationRoutes);

export default app;