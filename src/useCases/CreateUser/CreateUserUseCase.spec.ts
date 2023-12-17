import { describe, expect, test } from 'vitest'
import { User } from '../../entities/User'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoriesinMemory'
import { CreateUserUseCase } from './CreateUserUseCase'

describe('Create user service', () => {
  test('should be able to create a new user', async () => {
    const userData: User = {
      name: 'Luiz',
      email: 'luiz@gmail.com',
      password: 'luiz123',
    }

    const createUserService = new CreateUserUseCase(
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
    const createUserService = new CreateUserUseCase(
      new UsersRepositoryInMemory(),
    )

    expect(createUserService.execute(userData)).rejects.toThrowError(
      'O email já esta cadastrado',
    )
  })
})
