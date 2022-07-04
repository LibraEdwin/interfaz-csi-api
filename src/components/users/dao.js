// @ts-check
import UserModel from './model'
import { encryptPassword } from './services'

/**
 * logear usuario
 * @param {string} email
 *
 */
export async function findUserByEmail(email) {
  const foundUser = await UserModel
    .findOne({ email: email, isDeleted: false })
    .populate({
      path: 'profile',
      match: { isDeleted: false },
      select: 'name'
    })

  if (!foundUser) {
    return null
  }

  return foundUser
}

/**
 * Obtener la lista de todos los usuarios
 * @param {number} limit
 * @param {number} page
 *
 * @returns {Promise<void>}
 */
export async function findAllUsers(limit, page) {
  const options = {
    page: page || 1,
    limit: limit || 10,
    sort: { createdAt: 'desc' }
  }

  return await UserModel.paginate({ isDeleted: false }, options)
}

/**
 * Obtener un usuario por su ID
 * @param {number} id
 *
 * @returns {Promise<import('./types').User>}
 */
export async function findUserById(id) {
  const user = await UserModel.findOne({ _id: id, isDeleted: false })

  if (!user) {
    return null
  }

  return user
}

/**
 * Obtener un usuario por email registrado
 * @param {string} id
 *
 * @returns {Promise<import('./types').User>}
 */
export async function findUserByMail(id) {
  const user = await UserModel.findOne({ email: id, isDeleted: false }).populate({
    path: 'profile',
    match: { isDeleted: false },
    select: 'name'
  })

  if (!user) {
    return null
  }

  return user
}

/**
 * Crear un nuevo usuario
 * @param {import('./types').User} user
 *
 * @return {Promise<import('./types').User>}
 */
export async function createUser(user) {
  const { email, password, name, lastName, profile } = user

  const newUser = new UserModel({
    _id: await correlativeId(),
    email,
    password: await encryptPassword(password),
    name,
    lastName,
    profile
  })

  return await newUser.save()
}

/**
 * Actualizar el usuario
 * @param {number} id
 * @param {import('./types').User} user
 *
 * @returns {Promise<import('./types').User>}
 */
export async function updateUser(id, user) {
  const { email, password, name, lastName } = user
  const dataToUpdate = {}
  if (email) {
    dataToUpdate.email = email
  }
  if (password) {
    dataToUpdate.password = await encryptPassword(password)
  }
  if (name) {
    dataToUpdate.name = name
  }
  if (lastName) {
    dataToUpdate.lastName = lastName
  }

  const userUpdated = await UserModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    dataToUpdate,
    {
      new: true,
      runValidation: true
    }
  )

  if (!userUpdated) {
    return null
  }

  return userUpdated
}

/**
 * Eliminar un usuario en mongoose
 * @param {number} id
 *
 * @returns {Promise<import('./types').User>}
 */
export async function removeUser(id) {
  const result = await UserModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    {
      rawResult: true // Return the raw result from the MongoDB driver
    }
  )
  console.log(result, 'result dao')

  return result.lastErrorObject.updatedExisting
}

/**
 * Verificar si existe un email registrado
 * @param {string} email
 *
 * @return {Promise<any>}
 */
export async function emailExists(email) {
  return await UserModel.exists({ email })
}

/**
 *
 * @returns {Promise<Number>}
 */
export async function correlativeId() {
  const totalDocuments = await UserModel.countDocuments()
  return totalDocuments + 1
}

/**
 * Limpiamos la coleccion usuario
 * @returns {Promise<void>}
 */
export async function clearCollection() {
  await UserModel.deleteMany()
}

/**
 * Verificar si existe un usuario por el id indicado
 * @param {Number} id
 *
 * @return {Promise<any>}
 */
export async function userExists(id) {
  return await UserModel.exists({ _id: id, isDeleted: false })
}
