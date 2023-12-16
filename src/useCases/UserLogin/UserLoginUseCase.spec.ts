import { afterEach, describe, expect, it, vi } from 'vitest'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoriesinMemory'
import { verifyPassword } from './../../services/BcryptServices'
import { UserLoginUseCase } from './UserLoginUseCase'

vi.mock('./../../services/BcryptServices')

describe('User sign in', () => {
  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  it('must be able to log in successfully', async () => {
    const userData = {
      email: 'Luizd@gmail.com',
      password: 'luizd1234',
    }

    vi.mocked(verifyPassword).mockReturnValueOnce(Promise.resolve(true))

    const userLogin = new UserLoginUseCase(new UsersRepositoryInMemory())

    const userLogged = await userLogin.execute(
      userData.email,
      userData.password,
    )

    expect(userLogged).toHaveProperty('token')
  })

  it('should handle user not found case', async () => {
    const userData = {
      email: 'luiz@gmail.com',
      password: 'luiz123',
    }

    const userLogin = new UserLoginUseCase(new UsersRepositoryInMemory())

    expect(
      userLogin.execute(userData.email, userData.password),
    ).rejects.toThrowError('Usuario não encontrado')
  })

  it('should handle the case of incorrect password', async () => {
    const userData = {
      email: 'Luizd@gmail.com',
      password: 'luiz12',
    }

    const userLogin = new UserLoginUseCase(new UsersRepositoryInMemory())

    expect(
      userLogin.execute(userData.email, userData.password),
    ).rejects.toThrowError('Senha incorreta')
  })
})
