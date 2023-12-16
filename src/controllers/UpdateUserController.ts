import { UserUpdate } from '@/useCases/UserUpdate/UserUpdate'
import { Request, Response } from 'express'

export class UserUpdateController {
  constructor(private userUpdate: UserUpdate) {}

  async handle(request: Request, response: Response) {
    const { id } = request.user

    const userUpdated = await this.userUpdate.execute(request.body, Number(id))

    return response.status(200).json(userUpdated)
  }
}
