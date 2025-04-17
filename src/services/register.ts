// Import the Prisma client instance for database operations
import { prisma } from '@/lib/prisma'
// Import the hash function from bcryptjs for password hashing
import { hash } from 'bcryptjs'

// Define the interface for the request object used in the registration service
interface RegisterUseServiceRequest {
  name: string // User's name
  email: string // User's email
  password: string // User's password
}

// Asynchronous function to handle user registration logic
export async function registerUseService({
  name,
  email,
  password,
}: RegisterUseServiceRequest) {
  // Hash the password with a salt of 6 rounds before storing it in the database
  const passwordHash = await hash(password, 6)

  // Check if a user with the same email already exists in the database
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email, // Search for a user by email
    },
  })

  // If a user with the same email is found, throw an error
  if (userWithSameEmail) {
    throw new Error('The email address is already in use.') // Error message for duplicate email
  }

  // Create a new user in the database with the provided name, email, and hashed password
  await prisma.user.create({
    data: {
      name, // User's name
      email, // User's email
      password_hash: passwordHash, // Hashed password
    },
  })
}
