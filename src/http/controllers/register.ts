// Import required dependencies from Fastify and zod
import { FastifyRequest, FastifyReply } from 'fastify' // Fastify types for request and reply
import { z } from 'zod' // zod for schema validation
import { registerUseService } from '@/services/register' // Service for user registration logic

/**
 * Controller function to handle user registration
 * @param request FastifyRequest object containing the request data
 * @param reply FastifyReply object for sending the response
 */
export async function register(request: FastifyRequest, reply: FastifyReply) {
  // Define validation schema for request body using zod
  const registerBodySchema = z.object({
    name: z.string(), // Validate name as a string
    email: z.string().email(), // Validate email as a string and ensure it's a valid email format
    password: z.string(), // Validate password as a string
  })

  // Extract and validate request body data against the schema
  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    // Attempt to register the user using the provided service
    await registerUseService({ name, email, password })
  } catch (err) {
    // Handle errors during registration, such as duplicate email
    if (err instanceof Error) {
      return reply.status(409).send({ message: err.message }) // Send conflict status with error message
    }
  }

  // Return successful response with 201 Created status if registration is successful
  return reply.status(201).send()
}
