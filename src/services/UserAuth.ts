import { UsersRepository } from '@/repositories/UsersRepositories'
import { verifyToken } from './JwtServices'

export class UserAuth {
  private usersRepository: UsersRepository
  constructor() {
    this.usersRepository = new UsersRepository()
  }

  async execute(token: string) {
    const { id } = verifyToken(token)

    const FoundUser = await this.usersRepository.getUser({
      id: id,
    })

    if (!FoundUser) {
      throw new Error('não autorizado')
    }

    return FoundUser
  }
}
