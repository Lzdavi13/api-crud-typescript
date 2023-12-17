import { ApiError } from '@/helpers/apiError'
import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export const loginValidation =
  (schema: any) =>
  async (request: Request, response: Response, next: NextFunction) => {
    const { success, error } = await schema.safeParseAsync(request.body)

    if (error instanceof z.ZodError) {
      throw new ApiError(error.errors[0].message, 400)
    }

    next()
  }
