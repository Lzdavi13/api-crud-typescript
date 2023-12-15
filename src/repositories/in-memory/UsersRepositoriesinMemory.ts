import { User } from '@/entities/User'
import { IUserUpdate } from '@/interfaces/IUserUpdate'
import { randomUUID } from 'crypto'
import { IUserDTO } from '../../interfaces/IUserDTO'
import { IUsersRepository } from '../IUsersRepositories'

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: IUserDTO[] = [
    {
      id: 1,
      name: 'Luiz Davi',
      email: 'Luizd@gmail.com',
      password: 'luizd1234',
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

  async getUser(userData: IUserDTO): Promise<IUserDTO> {
    const userFound = this.users.find(
      (_user) => _user.email === userData.email || _user.id === userData.id,
    )

    return userFound
  }
  async update(user: IUserUpdate, id: number): Promise<IUserUpdate> {
    const userId: number = this.users.findIndex((_user) => _user.id === id)

    if (user.name) {
      this.users[userId].name = user.name
    }

    if (user.email) {
      this.users[userId].email = user.email
    }

    if (user.password) {
      this.users[userId].password = user.password
    }

    return this.users[userId]
  }
}
