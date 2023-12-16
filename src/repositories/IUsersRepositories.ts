import { User } from '../entities/User'
import { IUserDTO } from '../interfaces/IUserDTO'
import { ICreateUserDTO } from './../interfaces/ICreateUserDTO'
import { IUpdateUserDTO } from './../interfaces/IUpdateUserDTO'

export interface IUsersRepository {
  create(user: User): Promise<ICreateUserDTO>

  exists(user: User): Promise<boolean>

  getUser(userData: IUpdateUserDTO): Promise<IUserDTO>

  update(user: IUpdateUserDTO, id: number): Promise<IUpdateUserDTO>
}
