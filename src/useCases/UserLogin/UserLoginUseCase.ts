import { ApiError } from '../../helpers/apiError'
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

export class UserLoginUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(email: string, password: string): Promise<IUserLogin> {
    const user = await this.usersRepository.getUser({ email })

    if (!user) {
      throw new ApiError('Usuario não encontrado', 404)
    }

    const decryptedPassword = await verifyPassword(password, user.password)

    if (!decryptedPassword) {
      throw new ApiError('Senha incorreta', 400)
    }

    const jwtToken = sign(user.id)

    const { password: _, ..._user } = user

    return { user: _user, token: jwtToken }
  }
}
