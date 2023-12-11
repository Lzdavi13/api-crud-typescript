import { UserUpdateController } from '@/controllers/userUpadateController'
import { UsersRepository } from '@/repositories/UsersRepositories'
import { UserUpdate } from '@/useCases/UserUpdate/UserUpdate'

const usersRepository = new UsersRepository()
const userUpdate = new UserUpdate(usersRepository)
const userUpdateController = new UserUpdateController(userUpdate)

export default userUpdateController
