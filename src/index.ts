import 'dotenv/config'
import express from 'express'
import createUserController from './factory/createUserFactory'
import userLoginController from './factory/userLoginFactory'

const app = express()

app.use(express.json())

// console.log(
//   process.env.DB_HOST,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   process.env.DB_NAME,
// )

app.post('/user', (request, response) => {
  return createUserController.handle(request, response)
})

app.post('/login', (request, response) => {
  return userLoginController.handle(request, response)
})

app.listen(3333)
