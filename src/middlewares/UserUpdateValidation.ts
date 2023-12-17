import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { ApiError } from './../helpers/apiError'

export const userUpdateValidation =
  (schema: any) =>
  async (request: Request, response: Response, next: NextFunction) => {
    const { success, error } = await schema.safeParseAsync(request.body)

    console.log(success)

    if (error instanceof z.ZodError) {
      console.log(error.errors)

      throw new ApiError(error.errors[0].message, 400)
    }

    next()
  }
