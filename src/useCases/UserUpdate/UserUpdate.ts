import { IUserUpdate } from '../../interfaces/IUserUpdate'
import { IUsersRepository } from '../../repositories/IUsersRepositories'
import { hashPassword } from '../../services/BcryptServices'

export class UserUpdate {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(user: IUserUpdate, id: number) {
    try {
      if (user.email === '' || user.name === '' || user.password === '') {
        throw new Error('Você não pode enviar campos em branco')
      }

      if (user.password) {
        const encryptPassword = await hashPassword(user.password)

        user.password = encryptPassword
      }

      const userUpdated = await this.usersRepository.update({ ...user }, id)
      return userUpdated
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
