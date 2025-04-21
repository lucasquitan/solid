// Import types from Fastify and zod for handling requests and validation
import { FastifyRequest, FastifyReply } from 'fastify' // Fastify request and reply object types
import { z } from 'zod' // Schema validation library
import { RegisterService } from '@/services/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

/**
 * Controller function for user registration
 * @param request FastifyRequest object with incoming request data
 * @param reply FastifyReply object for sending responses
 */

export async function register(request: FastifyRequest, reply: FastifyReply) {
  // Schema for request body validation using zod
  const registerBodySchema = z.object({
    name: z.string(), // Validate name as a string
    email: z.string().email(), // Validate email as a proper email format
    password: z.string(), // Validate password as a string
  })

  // Validate and parse the request body data
  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const userRepository = new PrismaUsersRepository()
    const registerService = new RegisterService(userRepository)
    // Execute user registration with the provided details
    await registerService.execute({ name, email, password })
  } catch (err) {
    // Handle errors during registration, like duplicate email
    if (err instanceof Error) {
      return reply.status(409).send({ message: err.message }) // Send a 409 status with the error message
    }
  }

  // Return a 201 Created status if registration is successful
  return reply.status(201).send()
}
