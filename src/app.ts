// Import Fastify framework
import fastify from 'fastify'

// Import application routes
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

// Create and export Fastify application instance
export const app = fastify()

// Register application routes with the Fastify instance
app.register(appRoutes)

// Set up global error handler
app.setErrorHandler((err, request, reply) => {
  if (err instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: err.format() })
  }

  // Log error in non-production environment
  if (env.NODE_ENV !== 'production') {
    console.error(err)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
