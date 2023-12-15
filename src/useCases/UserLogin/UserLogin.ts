import { IUsersRepository } from '../../repositories/IUsersRepositories'
import { verifyPassword } from '../../services/BcryptServices'
import { sign } from '../../services/JwtServices'

interface IUserLogin {
  user: {
    id: number
    name: string
    email: string
  }
  token: string
}

export class UserLogin {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(email: string, password: string): Promise<IUserLogin> {
    try {
      const user = await this.usersRepository.getUser({ email })

      if (!user) {
        throw new Error('Usuario não encontrado')
      }

      const decryptedPassword = await verifyPassword(password, user.password)

      if (!decryptedPassword) {
        throw new Error('Senha incorreta')
      }

      const jwtToken = sign(user.id)

      const { password: _, ..._user } = user

      return { user: _user, token: jwtToken }
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
