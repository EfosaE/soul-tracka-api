import express from 'express';
import outreachRouter from './routes/outreachContactRoute';
import AppError from './utils/appError';
import globalErrorHandler from './controllers/errorController';
// Create an Express application
const app = express();
app.use(express.json());

app.use('/api/v1/outreach-contacts', outreachRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`cant find api path ${req.originalUrl}`, 404))
})

// Global error handling middleware
app.use(globalErrorHandler)
export default app