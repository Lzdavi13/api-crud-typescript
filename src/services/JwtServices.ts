import jwt from 'jsonwebtoken'

const privateKey = '101120'

export const sign = (id: number) => {
  const jwtToken = jwt.sign({ id }, privateKey, { expiresIn: '8h' })

  return jwtToken
}

export const verifyToken = (token: string) => {
  const id = jwt.verify(token, privateKey)

  return id
}
