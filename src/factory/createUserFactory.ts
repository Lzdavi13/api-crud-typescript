import { CreateUserController } from '@/controllers/CreateUserController'
import { UsersRepository } from '@/repositories/UsersRepositories'
import { CreateUserUseCase } from '@/useCases/CreateUser/CreateUserUseCase'

const usersRepository = new UsersRepository()
const createUserUseCase = new CreateUserUseCase(usersRepository)
const createUserController = new CreateUserController(createUserUseCase)

export default createUserController
