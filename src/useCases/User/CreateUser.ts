import { User } from '../../entities/User'
import { ApiError } from '../../helpers/apiError'
import { IUsersRepository } from '../../repositories/IUsersRepositories'
import { hashPassword } from '../../services/BcryptServices'

export class CreateUserSevice {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(user: User) {
    const userAlreadyExists = await this.usersRepository.exists(user)

    if (userAlreadyExists) {
      throw new ApiError('O email ja cadastrado', 400)
    }

    const encryptedPassword = await hashPassword(user.password)

    const _user = { ...user, password: encryptedPassword }

    const newUser = await this.usersRepository.create(_user)

    return newUser
  }
}
