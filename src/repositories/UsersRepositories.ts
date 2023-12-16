import { db } from '../database'
import { User } from '../entities/User'
import { IUserDTO } from '../interfaces/IUserDTO'
import { ICreateUserDTO } from './../interfaces/ICreateUserDTO'
import { IUpdateUserDTO } from './../interfaces/IUpdateUserDTO'
import { IUsersRepository } from './IUsersRepositories'

export class UsersRepository implements IUsersRepository {
  async create(user: User): Promise<ICreateUserDTO> {
    const userCreated = await db.user.create({
      data: { ...user },
      select: {
        id: true,
        email: true,
        name: true,
      },
    })

    return userCreated
  }

  async exists(user: User): Promise<boolean> {
    const userAllreadyExists = await db.user.findUnique({
      where: { email: user.email },
    })

    return !!userAllreadyExists
  }

  async getUser(userData: object): Promise<IUserDTO> {
    const userFound = await db.user.findUnique({
      where: {
        ...(userData as User),
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    })

    return userFound as IUserDTO
  }

  async update(user: IUpdateUserDTO, id: number): Promise<IUserDTO> {
    const userUpdated = await db.user.update({
      where: {
        id,
      },
      data: {
        ...user,
      },
    })

    return userUpdated
  }
}
