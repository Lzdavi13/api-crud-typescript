import express from 'express'
import { makeCreateUser } from './controllers'
// import { CreateUserController } from './controllers/createUserController'

const app = express()

const createUserController = makeCreateUser()

app.use(express.json())

app.post('/user', (request, response) => {
  return createUserController.handle(request, response)
})

app.listen(3333)
