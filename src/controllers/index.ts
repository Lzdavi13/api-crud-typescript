import { UsersRepository } from '@/repositories/UsersRepositories'
import { CreateUserSevice } from '@/useCases/createUser/CreateUserServices'
import { CreateUserController } from './createUserController'

export function makeCreateUser() {
  const usersRepository = new UsersRepository()
  const createUserService = new CreateUserSevice(usersRepository)
  const createUserController = new CreateUserController(createUserService)

  return createUserController
}

// export default createUserController
