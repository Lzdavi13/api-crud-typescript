import { Request, Response } from 'express'
import { CreateUserSevice } from './../useCases/createUser/CreateUserServices'

class CreateUser {
  private createUserSevice: CreateUserSevice

  constructor() {
    this.createUserSevice = new CreateUserSevice()
  }

  public async handle(Request: Request, Response: Response) {
    const { name, email, password } = Request.body
    try {
      const user = await this.createUserSevice.execute({
        name,
        email,
        password,
      })

      return Response.status(201).json({ ...user })
    } catch (error: any) {
      return Response.status(500).json({ mensagem: error.message })
    }
  }
}

export default CreateUser
