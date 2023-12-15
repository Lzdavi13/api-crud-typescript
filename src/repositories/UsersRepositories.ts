import { db } from '../database'
import { User } from '../entities/User'
import { IUserDTO } from '../interfaces/IUserDTO'
import { IUserUpdate } from '../interfaces/IUserUpdate'
import { IUsersRepository } from './IUsersRepositories'

export class UsersRepository implements IUsersRepository {
  async create(user: User): Promise<User> {
    const userCreated = await db.user.create({ data: { ...user } })

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

  async update(user: IUserUpdate, id: number): Promise<IUserDTO> {
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
