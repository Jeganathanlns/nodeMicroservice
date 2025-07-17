# Node Microservice

A scalable user management microservice with OTP validation, Redis caching, and JWT authentication.

## Features

- User registration with OTP validation
- JWT authentication
- Redis caching
- MySQL and MongoDB integration
- RESTful API endpoints

## API Documentation

API is documented using OpenAPI 3.0 specification. View the full documentation at `/documents/swagger.yaml`.

## Getting Started

### Prerequisites

- Node.js 14+
- Redis
- MySQL
- MongoDB

### Installation

```bash
# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Run development server
npm run dev
```

### Production Deployment

```bash
npm run build
npm start
```

## Scaling

### Horizontal Scaling

- Deploy multiple instances behind a load balancer
- Use containerization with Docker and Docker Compose
- Implement Kubernetes for orchestration

### Database Scaling

- MySQL read replicas
- MongoDB sharding
- Redis Cluster for distributed caching

## Testing

```bash
# Run tests
npm test
```

## License

MIT