import jwt from 'jsonwebtoken'
import { env } from 'node:process'

export const sign = (id: number) => {
  const jwtToken = jwt.sign({ id }, env.JWT_HASH, { expiresIn: '8h' })

  return jwtToken
}

export const verify = (token: string) => {
  const isValid = jwt.verify(token, env.JWT_HASH)

  return isValid
}
