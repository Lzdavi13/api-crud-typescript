import { ApiError } from '../../helpers/apiError'
import { IUserUpdate } from '../../interfaces/IUserUpdate'
import { IUsersRepository } from '../../repositories/IUsersRepositories'
import { hashPassword } from '../../services/BcryptServices'

export class UserUpdate {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(user: IUserUpdate, id: number) {
    if (user.email === '' || user.name === '' || user.password === '') {
      throw new ApiError('Você não pode enviar campos em branco', 400)
    }

    if (user.password) {
      const encryptPassword = await hashPassword(user.password)

      user.password = encryptPassword
    }

    const userUpdated = await this.usersRepository.update({ ...user }, id)
    return userUpdated
  }
}
