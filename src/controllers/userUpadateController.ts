import { UserUpdate } from '@/useCases/UserUpdate/UserUpdate'
import { Request, Response } from 'express'

export class UserUpdateController {
  constructor(private userUpdate: UserUpdate) {}

  async handle(request: Request, response: Response) {
    const { id } = request.user

    try {
      const userUpdated = await this.userUpdate.execute(
        request.body,
        Number(id),
      )

      return response.status(200).json(userUpdated)
    } catch (error: any) {
      return response.status(500).json({
        mensagem: 'não foi possivel atualizar o usuario',
        erro: error.message,
      })
    }
  }
}
