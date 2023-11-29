import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepositories'
import { UsersRepository } from '../../repositories/UsersRepositories'

export class CreateUserSevice {
  private usersRepository: IUsersRepository
  constructor() {
    this.usersRepository = new UsersRepository()
  }

  async execute(user: User) {
    const userAlreadyExists = await this.usersRepository.exists(user)

    if (userAlreadyExists) {
      throw new Error('O email ja cadastrado')
    }

    const newUser = await this.usersRepository.create(user)

    return newUser
  }
}
