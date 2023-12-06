import { describe, expect, test } from 'vitest'
import { User } from '../../entities/User'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoriesinMemory'
import { CreateUserSevice } from './CreateUser'

describe('Create user service', () => {
  test('should be able to create a new user', async () => {
    const userData: User = {
      name: 'Luiz',
      email: 'luiz@gmail.com',
      password: 'luiz123',
    }

    const createUserService = new CreateUserSevice(
      new UsersRepositoryInMemory(),
    )

    const userCreated = await createUserService.execute(userData)

    expect(userCreated).toHaveProperty('id')
  })

  test('should not be able to create a new user', async () => {
    const userData: User = {
      name: 'Luiz Davi',
      email: 'Luizd@gmail.com',
      password: 'luiz123',
    }
    const createUserService = new CreateUserSevice(
      new UsersRepositoryInMemory(),
    )

    expect(createUserService.execute(userData)).rejects.toThrowError(
      'O email ja cadastrado',
    )
  })
})
