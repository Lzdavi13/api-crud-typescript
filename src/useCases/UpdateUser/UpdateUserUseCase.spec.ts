import { describe, expect, it } from 'vitest'
import { UsersRepositoryInMemory } from './../../repositories/in-memory/UsersRepositoriesinMemory'
import { UpdateUserUseCase } from './UpdateUserUseCase'

describe('User update', () => {
  it('should be able update the user', async () => {
    const userData = {
      name: 'Luiz Santos',
      email: 'luizSan@gmail.com',
    }

    const userUpdate = new UpdateUserUseCase(new UsersRepositoryInMemory())

    const userUpdated = await userUpdate.execute(userData, 1)

    expect(userUpdated).toHaveProperty('id')
    expect(userUpdated).toHaveProperty('name')
    expect(userUpdated).toHaveProperty('email')
    expect(userUpdated).toHaveProperty('password')
  })

  it('should handle empty object case', async () => {
    const userData = { name: '', email: 'luiz@gmail' }

    const userUpdate = new UpdateUserUseCase(new UsersRepositoryInMemory())

    expect(userUpdate.execute(userData, 1)).rejects.toThrowError(
      'Você não pode enviar campos em branco',
    )
  })
})
