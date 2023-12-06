import { UserLoginController } from '@/controllers/userLoginController'
import { UsersRepository } from '@/repositories/UsersRepositories'
import { UserLogin } from '@/useCases/UserLogin/UserLogin'

const usersRepository = new UsersRepository()
const userLogin = new UserLogin(usersRepository)
const userLoginController = new UserLoginController(userLogin)

export default userLoginController
