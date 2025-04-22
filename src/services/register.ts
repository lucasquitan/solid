// Import the hash function from bcryptjs for password hashing
import { hash } from 'bcryptjs'
import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
// Define the interface for the request object used in the registration service
interface RegisterServiceRequest {
  name: string // User's name
  email: string // User's email
  password: string // User's password
}

// Define the RegisterService class for user registration
export class RegisterService {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterServiceRequest) {
    // Hash the password with a salt of 6 rounds before storing it in the database
    const passwordHash = await hash(password, 6)

    // Check if a user with the same email already exists in the database
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    // If a user with the same email is found, throw an error
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError() // Error message for user already exists
    }

    // Create a new user in the database
    await this.usersRepository.create({
      name,
      email,
      password_hash: passwordHash,
    })
  }
}
