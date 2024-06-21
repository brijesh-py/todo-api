import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index.routes.js';
import { todoRouter } from './routes/todo.routes.js';
import { authRouter } from './routes/auth.routes.js';

const app = express();

// Middlewares
app.use(cookieParser()); // Ensure cookie-parser is used before any route handlers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use((req, res, next) => {
//   console.log('Cookies: ', req.cookies);
//   console.log('Headers: ', req.headers);
//   next();
// });


// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true, // Ensure credentials is true
}));

// Routes
app.use('/', indexRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1', todoRouter);

// Error-handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

export default app;
