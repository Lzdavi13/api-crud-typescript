import { IUserUpdate } from '../../interfaces/IUserUpdate'
import { IUsersRepository } from '../../repositories/IUsersRepositories'
import { hashPassword } from '../../services/BcryptServices'

export class UserUpdate {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(user: IUserUpdate, id: number) {
    let encryptPassword: string = ''
    try {
      if (user.email === '' || user.name === '' || user.password === '') {
        throw new Error('Você não pode enviar campos em branco')
      }

      if (user.password) {
        encryptPassword = await hashPassword(user.password)
      }

      const userUpdated = await this.usersRepository.update(
        { ...user, password: encryptPassword },
        id,
      )
      return userUpdated
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
