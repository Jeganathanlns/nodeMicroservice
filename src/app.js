const express = require('express');
const healthRoutes = require('./routes/health.router');
const userRoutes = require('./routes/user.router');
const connectMongo = require('./dbConfig/mongo.config');
const logger = require('./middlewares/logger.middleware');

// Connect to MongoDB
connectMongo();

const app = express();
app.use(express.json());
app.use(logger);

app.use('/api/health', healthRoutes);
app.use('/api/users', userRoutes);

module.exports = app;
