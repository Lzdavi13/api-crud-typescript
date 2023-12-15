import { UserLogin } from '@/useCases/UserLogin/UserLogin'
import { Request, Response } from 'express'

export class UserLoginController {
  constructor(private userLogin: UserLogin) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const user = await this.userLogin.execute(email, password)

    return response.status(200).json({ ...user })
  }
}
