import { UserLoginController } from '@/controllers/UserLoginController'
import { UsersRepository } from '@/repositories/UsersRepositories'
import { UserLoginUseCase } from '@/useCases/UserLogin/UserLoginUseCase'

const usersRepository = new UsersRepository()
const userLoginUseCase = new UserLoginUseCase(usersRepository)
const userLoginController = new UserLoginController(userLoginUseCase)

export default userLoginController
