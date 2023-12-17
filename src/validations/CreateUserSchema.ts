import { z } from 'zod'

export const createUserSchema = z.object({
  name: z
    .string({
      required_error: 'Name é obrigatório',
      invalid_type_error: 'Name deve ser uma string',
    })
    .refine((data) => data.trim().length > 0, {
      message: 'Name não pode ser um campo vazio.',
    }),
  email: z
    .string({
      required_error: 'Email é obrigatório',
      invalid_type_error: 'Email deve ser uma string',
    })
    .email({ message: 'Email inválido' }),
  password: z
    .string({
      required_error: 'Password é obrigatório',
      invalid_type_error: 'Password deve ser uma string',
    })
    .refine((data) => data.trim().length > 0, {
      message: 'Password não pode ser um campo vazio.',
    }),
})
