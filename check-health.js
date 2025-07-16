require('dotenv').config();
const mysql = require('mysql2/promise');
const mongoose = require('mongoose');

async function checkHealth() {
  let mysqlStatus = false;
  let mongoStatus = false;
  let errors = [];

  // Check MySQL
  try {
    const db = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD
    });
    const [rows] = await db.execute('SELECT 1 as ok');
    mysqlStatus = rows[0].ok === 1;
    await db.end();
  } catch (err) {
    errors.push(`MySQL: ${err.message}`);
  }

  // Check MongoDB
  try {
    await mongoose.connect(process.env.MONGO_URI);
    mongoStatus = mongoose.connection.readyState === 1;
    await mongoose.disconnect();
  } catch (err) {
    errors.push(`MongoDB: ${err.message}`);
  }

  const status = mysqlStatus && mongoStatus ? 'ok' : 'degraded';
  
  console.log({
    status,
    mysql: mysqlStatus,
    mongodb: mongoStatus,
    errors: errors.length > 0 ? errors : undefined
  });
}

checkHealth();