import { FastifyRequest, FastifyReply } from 'fastify' // Fastify request and reply object types
import { z } from 'zod' // Schema validation library
import { InvalidCredentialsError } from '@/services/errors/invalid-credentialls-error'
import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'
/**
 * Controller function for user registration
 * @param request FastifyRequest object with incoming request data
 * @param reply FastifyReply object for sending responses
 */
export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateService = makeAuthenticateService()

    await authenticateService.execute({ email, password })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  // Return a 200 OK status if authentication is successful
  return reply.status(200).send()
}
