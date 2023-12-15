import 'dotenv/config'
import express from 'express'
import createUserController from './factory/createUserFactory'
import userLoginController from './factory/userLoginFactory'
import userUpdateController from './factory/userUpdateFactory'
import { ensureAuthenticated } from './middlewares/EnsureAuthenticated'

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

app.listen(3333)
