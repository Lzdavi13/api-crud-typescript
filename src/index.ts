import 'dotenv/config'
import express from 'express'
import 'express-async-errors'
import createUserController from './factory/CreateUserFactory'
import userUpdateController from './factory/UpdateUserFactory'
import userLoginController from './factory/UserLoginFactory'
import { ensureAuthenticated } from './middlewares/EnsureAuthenticated'
import { errorHandling } from './middlewares/ErrorHandling'

const app = express()

app.use(express.json())

app.post('/user', (request, response) => {
  return createUserController.handle(request, response)
})

app.post('/login', (request, response) => {
  return userLoginController.handle(request, response)
})

app.use(ensureAuthenticated)

app.put('/update', (request, response) => {
  return userUpdateController.handle(request, response)
})

app.use(errorHandling)

app.listen(3333)
