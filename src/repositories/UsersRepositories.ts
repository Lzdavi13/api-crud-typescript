import knex from '../database/conexao'
import { User } from '../entities/User'
import { IUserDTO } from '../interfaces/IUserDTO'
import { IUserUpdate } from '../interfaces/IUserUpdate'
import { IUsersRepository } from './IUsersRepositories'

export class UsersRepository implements IUsersRepository {
  async create(user: User): Promise<User> {
    const [userCreated] = await knex('users')
      .insert({ ...user })
      .returning('*')

    return userCreated as User
  }

  async exists(user: User): Promise<boolean> {
    const UserAlreadyExists = await knex('users')
      .where({ email: user.email })
      .first()

    if (UserAlreadyExists) {
      return true
    }

    return false
  }

  async getUser(userData: object): Promise<IUserDTO> {
    const userFound = await knex('users')
      .where({ ...userData })
      .first()

    return userFound
  }

  async update(user: IUserUpdate, id: number): Promise<IUserDTO> {
    const [userUpdated] = await knex('users')
      .where({ id })
      .update({ ...user })
      .returning('*')

    const { password, ..._user } = userUpdated
    return _user
  }
}
