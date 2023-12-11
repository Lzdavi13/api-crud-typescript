import { describe, expect, it } from 'vitest'
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoriesinMemory'
import { UserLogin } from './UserLogin'

describe('User sign in', () => {
  it('must be able to log in successfully', async () => {
    const userData = {
      email: 'Luizd@gmail.com',
      password: 'luiz123',
    }

    const userLogin = new UserLogin(new UsersRepositoryInMemory())

    const userLogged = await userLogin.execute(
      userData.email,
      userData.password,
    )

    expect(userLogged).toHaveProperty('token')
  })

  it('should handle user not found case', async () => {
    const userData = {
      email: 'Luiz@gmail.com',
      password: 'luiz123',
    }

    const userLogin = new UserLogin(new UsersRepositoryInMemory())

    expect(
      userLogin.execute(userData.email, userData.password),
    ).rejects.toThrowError('Usuario não encontrado')
  })

  it('deve lidar com o caso de senha incorreta', async () => {
    const userData = {
      email: 'Luizd@gmail.com',
      password: 'luiz12',
    }

    const userLogin = new UserLogin(new UsersRepositoryInMemory())

    expect(
      userLogin.execute(userData.email, userData.password),
    ).rejects.toThrowError('Senha incorreta')
  })
})
