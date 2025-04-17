// Import Fastify types
import { FastifyInstance } from 'fastify'

// Import route controllers
import { register } from './controllers/register'

/**
 * Configure and export application routes
 * @param app FastifyInstance to register routes with
 */
export async function appRoutes(app: FastifyInstance) {
  // Register user creation endpoint
  app.post('/users', register)
}
