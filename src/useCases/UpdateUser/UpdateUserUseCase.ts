import { User } from '@/entities/User'
import { ApiError } from '../../helpers/apiError'
import { IUpdateUserDTO } from '../../interfaces/IUpdateUserDTO'
import { IUsersRepository } from '../../repositories/IUsersRepositories'
import { hashPassword } from '../../services/BcryptServices'

export class UpdateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(user: IUpdateUserDTO, id: number) {
    if (user.email === '' || user.name === '' || user.password === '') {
      throw new ApiError('Você não pode enviar campos em branco', 400)
    }

    const userAlreadyExists = await this.usersRepository.exists(user as User)

    if (userAlreadyExists) {
      throw new ApiError('O email já esta cadastrado', 400)
    }

    if (user.password) {
      const encryptPassword = await hashPassword(user.password)

      user.password = encryptPassword
    }

    const userUpdated = await this.usersRepository.update({ ...user }, id)

    return userUpdated
  }
}
