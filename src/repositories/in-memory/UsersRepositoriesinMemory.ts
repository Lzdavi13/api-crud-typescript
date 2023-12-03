import { User } from '@/entities/User'
import { randomUUID } from 'crypto'
import { IUsersRepository } from '../IUsersRepositories'

export class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = [
    {
      name: 'Luiz Davi',
      email: 'Luizd@gmail.com',
      password: 'luiz123',
    },
  ]
  create(user: User): Promise<User> {
    Object.assign(user, { id: randomUUID() })

    this.users.push(user)

    return user
  }

  exists(user: User): Promise<boolean> {
    const UserAlreadyExists = this.users.some(
      (userDb) => userDb.email === user.email,
    )

    return !!UserAlreadyExists
  }
}
