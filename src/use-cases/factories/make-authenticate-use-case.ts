import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthentcateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const userRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthentcateUseCase(userRepository)

  return authenticateUseCase
}
