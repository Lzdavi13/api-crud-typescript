import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepositories'

export class CreateUserSevice {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(user: User) {
    try {
      const userAlreadyExists = await this.usersRepository.exists(user)

      if (userAlreadyExists) {
        throw new Error('O email ja cadastrado')
      }

      const newUser = await this.usersRepository.create(user)

      return newUser
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
