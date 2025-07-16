# Node Microservice API Documentation

## Overview
User management microservice with OTP validation, Redis caching, and JWT authentication.

## Features
- User CRUD operations
- OTP-based registration
- Redis caching for OTP storage
- JWT authentication
- MySQL database with Sequelize ORM
- MongoDB integration
- Health check endpoint

## API Endpoints

### Health Check
- `GET /api/health` - Check service health

### User Management
- `POST /api/users/generate-otp` - Generate OTP for registration
- `POST /api/users/register` - Register user with OTP validation
- `GET /api/users` - Get all users (requires auth)
- `GET /api/users/:id` - Get user by ID (requires auth)
- `PUT /api/users/:id` - Update user (requires auth)
- `DELETE /api/users/:id` - Delete user (requires auth)
- `POST /api/users/login` - User login

## Authentication
Use Bearer token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Database Schema

### User Model
```sql
CREATE TABLE Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdBy VARCHAR(255),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Environment Variables
```
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB=my_mysql_db
MYSQL_USER=root
MYSQL_PASSWORD=

MONGO_URI=mongodb://localhost:27017/my_mongo_db

REDIS_HOST=localhost
REDIS_PORT=6379

JWT_SECRET=supersecret123
PORT=3000
```

## Usage Flow
1. Generate OTP: `POST /api/users/generate-otp`
2. Register user: `POST /api/users/register` (with OTP)
3. Login: `POST /api/users/login`
4. Use JWT token for protected endpoints