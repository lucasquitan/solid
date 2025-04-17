// Import the PrismaClient class from Prisma ORM
import { PrismaClient } from '@prisma/client'
// Import environment variables
import { env } from '../env'

/**
 * Create and export a new PrismaClient instance for database operations
 * Configures logging based on the environment:
 * - In development: logs queries, errors and warnings
 * - In production: logs only errors
 */
export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query', 'error', 'warn'] : ['error'],
})
