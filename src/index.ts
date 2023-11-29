import express from 'express'
import createUser from './controllers/createUser'

const app = express()

app.use(express.json())

app.post('/user', (Request, Response) => {
  createUser.handle(Request, Response)
})

app.listen(3333)
