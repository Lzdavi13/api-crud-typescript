import { describe, expect, it } from 'vitest'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoriesinMemory'
import { userUpdateSchema } from '../../validations/UserUpdateSchema'
import { UpdateUserUseCase } from './UpdateUserUseCase'

describe('User update', () => {
  it('should be able update the user', async () => {
    const userData = {
      name: 'Luiz Santos',
      email: 'luizSan@gmail.com',
    }

    const { success } = await userUpdateSchema.safeParseAsync(userData)

    const userUpdate = new UpdateUserUseCase(new UsersRepositoryInMemory())

    const userUpdated = await userUpdate.execute(userData, 1)

    expect(success).toEqual(true)
    expect(userUpdated).toHaveProperty('id')
    expect(userUpdated).toHaveProperty('name')
    expect(userUpdated).toHaveProperty('email')
    expect(userUpdated).toHaveProperty('password')
  })

  it('E-mail already registered', async () => {
    const userData = { name: 'Luiz', email: 'Luizd@gmail.com' }

    const userUpdate = new UpdateUserUseCase(new UsersRepositoryInMemory())

    expect(userUpdate.execute(userData, 1)).rejects.toThrowError(
      'O email já esta cadastrado',
    )
  })
})
