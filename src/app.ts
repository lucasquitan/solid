// Import Fastify framework
import fastify from 'fastify'

// Import application routes
import { appRoutes } from './http/routes'

// Create and export Fastify application instance
export const app = fastify()

// Register application routes with the Fastify instance
app.register(appRoutes)
