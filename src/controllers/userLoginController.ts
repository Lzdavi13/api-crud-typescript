import { UserLogin } from '@/useCases/UserLogin/UserLogin'
import { Request, Response } from 'express'

export class UserLoginController {
  constructor(private userLogin: UserLogin) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    console.log(email, password)

    try {
      const user = await this.userLogin.execute(email, password)

      return response.status(200).json({ ...user })
    } catch (error: any) {
      console.log('error', error)

      return response
        .status(500)
        .json({ mensagem: 'erro interno', erro: error.message })
    }
  }
}
