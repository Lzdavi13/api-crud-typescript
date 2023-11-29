import { CreateUserSevice } from './../useCases/createUser/CreateUserServices'

class CreateUser {
  private createUserSevice: CreateUserSevice

  constructor() {
    this.createUserSevice = new CreateUserSevice()
  }

  async handle(Request: Request, Response: Response) {
    const { name, email, password } = Request.body
    try {
      const user = await this.createUserSevice.execute({
        name,
        email,
        password,
      })

      return Response.status(201).json({ ...user })
    } catch (error: any) {
      console.log(error.message)
    }
  }
}

export default new CreateUser()
