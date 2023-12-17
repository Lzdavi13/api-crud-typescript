import { z } from 'zod'

export const userUpdateSchema = z
  .object({
    name: z
      .string({
        invalid_type_error: 'Name deve ser uma string',
      })
      .refine((data) => data.trim().length > 0, {
        message: 'Name não pode ser um campo vazio.',
      })
      .optional(),
    email: z
      .string({ invalid_type_error: 'Email deve ser uma string' })
      .email({ message: 'Email inválido' })
      .optional(),
    password: z
      .string({ invalid_type_error: 'Password deve ser uma string' })
      .refine((data) => data.trim().length > 0, {
        message: 'Password não pode ser um campo vazio.',
      })
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Informe pelo menos um campo',
  })
