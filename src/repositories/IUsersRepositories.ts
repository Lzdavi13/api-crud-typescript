import { User } from '../entities/User'
import { IUserDTO } from './UsersRepositories'

export interface IUsersRepository {
  create(user: User): Promise<User>

  exists(user: User): Promise<boolean>

  getUserByEmail(email: string): Promise<IUserDTO>
}
