require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD
    });
    
    console.log('✅ MySQL connected successfully');
    await connection.end();
  } catch (error) {
    console.log('❌ MySQL connection failed:', error.message);
  }
}

testConnection();