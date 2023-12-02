import { UsersRepository } from '@/repositories/UsersRepositories'
import { User } from '../../entities/User'
import { CreateUserSevice } from './CreateUserServices'

describe('Create user service', () => {
  test('should be able to create a new user', async () => {
    const userData: User = {
      name: 'Luiz',
      email: 'luiz3@gmail.com',
      password: 'test123',
    }

    const createUserService = new CreateUserSevice(new UsersRepository())

    const userCreated = await createUserService.execute(userData)

    expect(userCreated).toHaveProperty('id')
  })

  test('should not be able to create a new user', async () => {
    const userData: User = {
      name: 'teste',
      email: 'teste3@gmail.com',
      password: 'test123',
    }
    const createUserService = new CreateUserSevice(new UsersRepository())

    expect(createUserService.execute(userData)).rejects.toEqual(
      'O email ja cadastrado',
    )
  })
})
