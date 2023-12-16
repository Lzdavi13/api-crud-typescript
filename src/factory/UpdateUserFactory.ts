import { UserUpdateController } from '@/controllers/UpdateUserController'
import { UsersRepository } from '@/repositories/UsersRepositories'
import { UpdateUserUseCase } from '@/useCases/UpdateUser/UpdateUserUseCase'

const usersRepository = new UsersRepository()
const updateUserUseCase = new UpdateUserUseCase(usersRepository)
const userUpdateController = new UserUpdateController(updateUserUseCase)

export default userUpdateController
