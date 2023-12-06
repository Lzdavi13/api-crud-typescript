import jwt from 'jsonwebtoken'

const hash = '101120'

// interface IJwtData {
//   id: number
// }

export const sign = (id: number) => {
  const jwtToken = jwt.sign({ id }, hash, { expiresIn: '8h' })

  return jwtToken
}

export const verify = (token: string) => {
  const isValid = jwt.verify(token, hash)

  return isValid
}
