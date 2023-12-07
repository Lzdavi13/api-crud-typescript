import { compare, genSalt, hash } from 'bcrypt'

export const hashPassword = async (password: string) => {
  const saltGenerated = await genSalt(8)

  return hash(password, saltGenerated)
}

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
) => {
  return await compare(password, hashedPassword)
}
