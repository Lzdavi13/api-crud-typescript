import { User } from '../entities/User'

export interface IUsersRepository {
  create(user: User): Promise<User>

  exists(user: User): Promise<boolean>
}
