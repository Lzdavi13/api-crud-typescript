import { UserAuth } from '@/services/UserAuth'
import { NextFunction, Request, Response } from 'express'

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const userAuth = new UserAuth()

  const { authorization } = request.headers

  try {
    if (!authorization) {
      return response.status(401).json({ mensagem: 'Não autorizado' })
    }

    const [type, token] = authorization.split(' ')
    if (type !== 'Bearer') {
      return response.status(401).json({ mensagem: 'token invalido' })
    }

    const userAuthenticated = await userAuth.execute(token)

    const { password, ..._user } = userAuthenticated

    request.user = _user

    return next()
  } catch (error: any) {
    return response.status(500).json(error)
  }
}

export { ensureAuthenticated }
