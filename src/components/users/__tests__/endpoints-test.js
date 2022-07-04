import supertest from 'supertest'
import app from 'app'
import config from 'config'
import { connectionMongo, disconnectMongo } from 'backing/databases/mongodb'
import * as UserDao from '../dao'

const { MONGODB_URI } = config.get('DATABASE')
const api = supertest(app)

const initialUsers = [
  {
    email: 'admin@gmail.com',
    password: 'P@55word',
    name: 'Jorge',
    lastName: 'Interfaz',
    profile: 1
  },
  {
    email: 'editor1@gmail.com',
    password: 'P@55word',
    name: 'David',
    lastName: 'Sandoval',
    profile: 2
  }
]

beforeAll(async () => {
  await connectionMongo(MONGODB_URI)
  await UserDao.clearCollection()
  await UserDao.createUser(initialUsers[0])
  // await UserDao.createUser(initialUsers[1])
})

describe('POST /api/v2/users/login', () => {
  test('Debería devolver un estatus 200 ok', async () => {
    await api.post('/api/v2/users/login')
      .auth('admin@gmail.com', 'P@55word')
      .expect(200)
  })

  test('Debería devolver un estatus 200 ok', async () => {
    await api.post('/api/v2/users/login')
      .auth('admin@gmail.com', 'rtrt9drnfogjf')
      .expect(401)
  })
})

afterAll(async () => {
  disconnectMongo()
})
