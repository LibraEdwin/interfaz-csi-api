// @ts-check
import config from 'config'
import jwt from 'jsonwebtoken'
import * as UserDao from './dao'
import * as UserService from './services'
import * as UserDto from './dto'

const JSWT = config.get('JSWT')

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function loginUser(req, res) {
  const { email, password } = req.user

  const userLogin = await UserDao.findUserByEmail(email)
  if (!userLogin) {
    return res.failAuthentication({ errors: 'El correo es incorrecto' })
  }

  const match = await UserService.comparePassword(userLogin.password, password)
  if (!match) {
    return res.failAuthentication({ errors: 'La contraseña es inválida' })
  }

  const payload = {
    user: {
      id: userLogin._id,
      email: userLogin.email,
      name: userLogin.name,
      lastName: userLogin.lastName,
      profile: userLogin.profile.name
    }
  }

  const token = jwt.sign(
    payload,
    JSWT.SESSION_SECRET,
    { expiresIn: JSWT.SESSION_EXPIRE_IN }
  )

  res.respond({
    data: { access_token: token }
  })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function logoutUser(req, res) {
  return res.cookie('access_token', '', {
    expires: new Date(0),
    path: '/'
  })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function index(req, res) {
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)

  const users = await UserDao.findAllUsers(limit, page)
  const data = UserDto.multiple(users)

  return res.respond({ data })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function getById(req, res) {
  // return user by id
  const { id } = req.params
  const user = await UserDao.findUserById(Number(id))
  return res.respond({ data: user })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function create(req, res) {
  /**
   * @constant
   * @type {import('./types').User}
   * */
  const dataUser = req.body
  /**
   * validamos los datos del usuario a crear
   */
  const errors = await UserService.validateUserCreate(dataUser)

  if (errors.length > 0) {
    /**
     * retornamos la respuesta con los errores
     */
    return res.failValidationError({ errors })
  }
  /**
   * registramos al usuario
   */
  const userCreated = await UserDao.createUser(dataUser)

  return res.respondCreated({ data: userCreated })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function updateById(req, res) {
  const { id } = req.params
  const dataUser = req.body

  const updateUser = await UserDao.updateUser(Number(id), dataUser)
  return res.respondUpdated({ data: updateUser })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function removeById(req, res) {
  const { id } = req.params
  console.log(id, 'id cont')

  const userDeleted = await UserDao.removeUser(Number(id))
  console.log(userDeleted)
  return res.respondDeleted({ data: userDeleted })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function getByEmail(req, res) {
  const { id } = req.params
  const user = await UserDao.findUserByMail(id)

  if (!user) {
    return res.failNotFound({ errors: 'El email no se encuentra registrado' })
  }

  return res.respond({ data: user })
}
