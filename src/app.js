const express = require('express');
const healthRoutes = require('./routes/health.router');
const userRoutes = require('./routes/user.router');
const roleRoutes = require('./routes/role.router');
const permissionRoutes = require('./routes/permission.router');
const moduleRoutes = require('./routes/module.router');
const connectMongo = require('./dbConfig/mongo.config');
const sequelize = require('./dbConfig/sequelize.config');
const logger = require('./middlewares/logger.middleware');

// Connect to MongoDB
connectMongo();

// Sync database
sequelize.sync({ alter: true });

const app = express();
app.use(express.json());
app.use(logger);

app.use('/admin/healthCheck', (req, res) => {
  res.json({
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

app.use('/admin/health', healthRoutes);
app.use('/admin/users', userRoutes);
app.use('/admin/roles', roleRoutes);
app.use('/admin/permissions', permissionRoutes);
app.use('/admin/modules', moduleRoutes);

module.exports = app;
