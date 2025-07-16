const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const db = require('../dbConfig/postgrsh.config');

router.get('/', async (req, res) => {
  let pgStatus = false;
  let mongoStatus = false;
  let errors = [];

  try {
    const pgCheck = await db.one('SELECT 1 as ok');
    pgStatus = pgCheck.ok === 1;
  } catch (err) {
    errors.push(`PostgreSQL: ${err.message}`);
  }

  try {
    mongoStatus = mongoose.connection.readyState === 1;
  } catch (err) {
    errors.push(`MongoDB: ${err.message}`);
  }

  const overallStatus = pgStatus && mongoStatus ? 'ok' : 'degraded';
  
  res.json({
    status: overallStatus,
    postgres: pgStatus,
    mongodb: mongoStatus,
    errors: errors.length > 0 ? errors : undefined
  });
});

module.exports = router;