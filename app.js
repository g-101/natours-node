const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES
app.use(morgan('dev')); // 3rd-Party Middleware
app.use(express.json());

app.use((req, res, next) => {
  // meu proprio middleware
  // adicionando meu middlware no objeto req
  req.time = new Date().toISOString();
  next();
});

// ROUTES
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
