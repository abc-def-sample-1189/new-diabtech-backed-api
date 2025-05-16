import express, { json } from 'express';
import cors from 'cors';
import routes from './routes/index.route.js';

const app = express();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.use('/api/v1', routes);

export default app;

