import { User } from '../../entities/User'
import { IUsersRepository } from '../../repositories/IUsersRepositories'
import { hashPassword } from '../../services/BcryptServices'

export class CreateUserSevice {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(user: User) {
    // try {
    const userAlreadyExists = await this.usersRepository.exists(user)

    if (userAlreadyExists) {
      throw new Error('O email ja cadastrado')
    }

    const encryptedPassword = await hashPassword(user.password)

    const _user = { ...user, password: encryptedPassword }

    const newUser = await this.usersRepository.create(_user)

    return newUser
    // } catch (error) {
    //   return Promise.reject(error)
    // }
  }
}
