// @ts-check
import bcrypt from 'bcrypt'
import * as UserDao from './dao'

/**
 * Validar un correo electrónico
 * @param {string} email - (no vacío | formato de email | que no esté registrado en la bd)
 *
 * @returns {Promise<null|string>}
 */
export async function validateEmail (email) {
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!email) {
    return 'El email es requerido'
  }

  if (!regexEmail.test(email)) {
    return 'El email ingresado tiene un formato incorrecto'
  }

  if (await UserDao.emailExists(email)) {
    return 'El email ya se encuentra registrado'
  }

  return null
}

/**
 * Validar una contraseña
 * @param {string} password - (no vacío | que tenga 8 catacteres, una mayúscula , un número y un caracter especial)
 *
 * @returns {string|null}
 */
export function validatePassword (password) {
  const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

  if (!password) {
    return 'La contraseña es requerida'
  }

  if (!regexPassword.test(password)) {
    return 'La contraseña debe tener mínimo 8 catacteres, una mayúscula, un número y un caracter especial'
  }

  return null
}

/**
 * Validar la creación del usuario
 * @param {import('./types').User} user - datos para crear
 *
 * @returns {Promise<string[]>}
 */
export async function validateUserCreate (user) {
  const { email, password } = user
  const errors = []

  const errorEmail = await validateEmail(email)
  const errorPassword = validatePassword(password)

  if (errorEmail) {
    errors.push(errorEmail)
  }
  if (errorPassword) {
    errors.push(errorPassword)
  }

  return errors
}

/**
 * Función para cifrar una contraseña con bcrypt
 * @param {string} password
 * @returns {Promise<string>}
 */
export async function encryptPassword (password) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

/**
 * Función para comparar contraseñas
 * @param {string} password
 * @param {string} passwordReceived
 * @returns {Promise<boolean>}
 */
export async function comparePassword (password, passwordReceived) {
  return await bcrypt.compare(passwordReceived, password)
}
