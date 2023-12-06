import { User } from '@/entities/User'
import { randomUUID } from 'crypto'
import { IUsersRepository } from '../IUsersRepositories'
import { IUserDTO } from '../UsersRepositories'

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [
    {
      name: 'Luiz Davi',
      email: 'Luizd@gmail.com',
      password: 'luiz123',
    },
  ]
  async create(user: User): Promise<User> {
    Object.assign(user, { id: randomUUID() })

    this.users.push(user)

    return user
  }

  async exists(user: User): Promise<boolean> {
    const UserAlreadyExists = this.users.some(
      (_user) => _user.email === user.email,
    )

    return !!UserAlreadyExists
  }

  async getUserByEmail(email: string): Promise<IUserDTO> {
    const userFound = this.users.find((_user) => _user.email === email)

    return userFound as IUserDTO
  }
}
