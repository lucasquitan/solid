// Import types from Fastify and zod for handling requests and validation
import { FastifyRequest, FastifyReply } from 'fastify' // Fastify request and reply object types
import { z } from 'zod' // Schema validation library
import { RegisterService } from '@/services/register' // Service for handling user registration logic
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository' // Repository for interacting with the user database
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists-error' // Custom error for existing user scenario

/**
 * Controller function for user registration
 * @param request FastifyRequest object with incoming request data
 * @param reply FastifyReply object for sending responses
 */
export async function register(request: FastifyRequest, reply: FastifyReply) {
  // Define schema for request body validation using zod
  const registerBodySchema = z.object({
    name: z.string(), // Validate name as a string
    email: z.string().email(), // Validate email as a proper email format
    password: z.string().min(6), // Validate password as a string with a minimum length of 6
  })

  // Validate and parse the request body data according to the schema
  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    // Instantiate the user repository for database operations
    const userRepository = new PrismaUsersRepository()
    // Instantiate the registration service with the user repository
    const registerService = new RegisterService(userRepository)
    // Execute user registration with the provided details
    await registerService.execute({ name, email, password })
  } catch (err) {
    // Handle errors during registration, such as duplicate email
    if (err instanceof UserAlreadyExistsError) {
      // Send a 409 Conflict status with the error message if user already exists
      return reply.status(409).send({ message: err.message })
    }

    // Rethrow any other errors to be handled by the global error handler
    throw err
  }

  // Return a 201 Created status if registration is successful
  return reply.status(201).send()
}
