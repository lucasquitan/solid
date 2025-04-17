# Solid API

A RESTful API built with Node.js, Fastify, and Prisma that manages gym check-ins with location-based validation. This project follows SOLID principles to ensure maintainable and scalable code.

## Features

- User authentication and management
- Gym registration and management
- Location-based check-in validation (100m radius)
- Check-in history tracking
- Real-time validation status

## Tech Stack

- Node.js
- TypeScript
- Fastify
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Docker

## SOLID Principles Implementation

This project strictly follows SOLID principles:

- **S**ingle Responsibility Principle: Each class and module has a single responsibility
- **O**pen/Closed Principle: The code is open for extension but closed for modification
- **L**iskov Substitution Principle: Subtypes can be substituted for their base types
- **I**nterface Segregation Principle: Clients don't depend on interfaces they don't use
- **D**ependency Inversion Principle: High-level modules don't depend on low-level modules

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn
- Docker and Docker Compose

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
POSTGRES_DATABASE=gym_checkin
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DATABASE}?schema=public"

# Application
JWT_SECRET="your-secret-key"
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/solid.git
cd solid
```

2. Install dependencies:
```bash
npm install
```

3. Start the database using Docker:
```bash
docker-compose up -d
```

4. Set up the database:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

## Docker Setup

The project includes a Docker Compose configuration for the PostgreSQL database:

```yaml
version: '3'
services:
  solid-pg:
    image: bitnami/postgresql
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DATABASE=${POSTGRES_DATABASE}
    ports:
      - 5432:5432
```

To start the database:
```bash
docker-compose up -d
```

To stop the database:
```bash
docker-compose down
```

## API Endpoints

### Users
- `POST /users` - Create a new user
- `POST /sessions` - User authentication
- `GET /me` - Get authenticated user profile

### Gyms
- `POST /gyms` - Register a new gym
- `GET /gyms` - List all gyms
- `GET /gyms/:id` - Get gym details

### Check-ins
- `POST /check-ins` - Create a new check-in
- `GET /check-ins/history` - Get user's check-in history
- `PATCH /check-ins/:id/validate` - Validate a check-in

## Business Rules

- Users can only check-in when they are within 100 meters of the gym
- Each check-in must be validated by gym staff
- Users can view their check-in history
- Gyms must be registered with valid location coordinates

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.