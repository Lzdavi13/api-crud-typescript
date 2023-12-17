import 'dotenv/config'
import express from 'express'
import 'express-async-errors'
import createUserController from './factory/CreateUserFactory'
import userUpdateController from './factory/UpdateUserFactory'
import userLoginController from './factory/UserLoginFactory'
import { ensureAuthenticated } from './middlewares/EnsureAuthenticated'
import { errorHandling } from './middlewares/ErrorHandling'
import { loginValidation } from './middlewares/LoginValidation'
import { userCreteValidation } from './middlewares/UserCreateValidation'
import { createUserSchema } from './validations/CreateUserSchema'
import { loginSchema } from './validations/UserLoginSchema'

const app = express()

app.use(express.json())

app.post(
  '/user',
  userCreteValidation(createUserSchema),
  (request, response) => {
    return createUserController.handle(request, response)
  },
)

app.post('/login', loginValidation(loginSchema), (request, response) => {
  return userLoginController.handle(request, response)
})

app.use(ensureAuthenticated)

app.put('/update', (request, response) => {
  return userUpdateController.handle(request, response)
})

app.use(errorHandling)

app.listen(3333)
