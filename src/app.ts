// Import the 'express' module
import express from 'express';
import outreachRouter from './routes/outreachContactRoute';

// Create an Express application
const app = express();
app.use(express.json());

app.use('/api/v1/outreach-contacts', outreachRouter);

export default app