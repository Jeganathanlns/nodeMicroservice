const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const dbs = require('../dbConfig/sql.config');

router.get('/', async (req, res) => {
  let mysqlStatus = false;
  let mongoStatus = false;
  let errors = [];

  try {
    const [rows] = await dbs.execute('SELECT 1 as ok');
    mysqlStatus = rows[0].ok === 1;
  } catch (err) {
    errors.push(`MySQL: ${err.message}`);
  }

  try {
    mongoStatus = mongoose.connection.readyState === 1;
  } catch (err) {
    errors.push(`MongoDB: ${err.message}`);
  }

  const overallStatus = mysqlStatus && mongoStatus ? 'ok' : 'degraded';
  
  res.json({
    status: overallStatus,
    mysql: mysqlStatus,
    mongodb: mongoStatus,
    errors: errors.length > 0 ? errors : undefined
  });
});

module.exports = router;