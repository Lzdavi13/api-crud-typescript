import { UserLoginUseCase } from '@/useCases/UserLogin/UserLoginUseCase'
import { Request, Response } from 'express'

export class UserLoginController {
  constructor(private userLoginUseCase: UserLoginUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const user = await this.userLoginUseCase.execute(email, password)

    return response.status(200).json({ ...user })
  }
}
