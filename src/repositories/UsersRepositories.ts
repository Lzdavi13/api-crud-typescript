import knex from '../database/conexao'
import { User } from '../entities/User'
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
}
