import { CreateUserController } from '@/controllers/createUserController'
import { UsersRepository } from '@/repositories/UsersRepositories'
import { CreateUserSevice } from '@/useCases/User/CreateUser'

const usersRepository = new UsersRepository()
const createUserService = new CreateUserSevice(usersRepository)
const createUserController = new CreateUserController(createUserService)

export default createUserController
