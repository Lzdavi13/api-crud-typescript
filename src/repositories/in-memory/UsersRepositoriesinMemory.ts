import { User } from '@/entities/User'
import { IUpdateUserDTO } from '@/interfaces/IUpdateUserDTO'
import { IUserDTO } from '../../interfaces/IUserDTO'
import { IUsersRepository } from '../IUsersRepositories'
import { ICreateUserDTO } from './../../interfaces/ICreateUserDTO'

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: IUserDTO[] = [
    {
      id: 1,
      name: 'Luiz Davi',
      email: 'Luizd@gmail.com',
      password: 'luizd1234',
    },
  ]
  async create(user: User): Promise<ICreateUserDTO> {
    const newUser: IUserDTO = {
      id: Math.floor(Math.random() * 10000) + 1,
      ...user,
    }

    return newUser
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

    return userFound as IUserDTO
  }
  async update(user: IUpdateUserDTO, id: number): Promise<IUpdateUserDTO> {
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
