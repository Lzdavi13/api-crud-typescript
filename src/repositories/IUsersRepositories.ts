import { IUserUpdate } from '@/interfaces/IUserUpdate'
import { User } from '../entities/User'
import { IUserDTO } from '../interfaces/IUserDTO'

export interface IUsersRepository {
  create(user: User): Promise<User>

  exists(user: User): Promise<boolean>

  getUser(userData: IUserUpdate): Promise<IUserDTO>

  update(user: IUserUpdate, id: number): Promise<IUserUpdate>
}
