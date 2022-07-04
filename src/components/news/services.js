// @ts-check
import * as UserDao from 'components/users/dao'

/**
 * Validar la noticia para la creación
 * @param {import('./types').News} news
 * @param {*} fileThumbnail
 *
 * @returns {Promise<string[]>}
 */
export async function validateNewsCreate (news, fileThumbnail) {
  /**
   * @constant
   * @type {string[]}
   */
  const errors = []

  const { title, author } = news
  const errorAuthor = await validateAuthor(author)

  /**
   * Validar si el título no es nulo
   */
  if (!title) {
    errors.push('El título es requerido')
  }

  /**
   * Validar si el autor es correcto
   */
  if (errorAuthor) {
    errors.push(errorAuthor)
  }

  /**
   * Validar si la imagen destacada no es nulo
   */
  if (!fileThumbnail) {
    errors.push('La imagen destacada es requerida')
  }

  return errors
}

export async function validateNewsUpdate (news) {
  /**
   * @constant
   * @type {string[]}
   */
  const errors = []
  const { title, author } = news

  if (title !== undefined && !title) {
    errors.push('El título no puede estar vacío')
  }

  if (author !== undefined && !author) {
    errors.push('La noticia debe tener un id de autor válido')
  }

  return errors
}

/**
 * Validación de un autor
 * @param {number} author - (el autor en realidad es un id Usuario)
 */
export async function validateAuthor (author) {
  /**
   * Si no está vacío
   */
  if (!author) {
    return 'El autor es requerido'
  }

  /**
   * Si el autor es de tipo numérico porque es un id
   */
  if (isNaN(author)) {
    return 'El autor debe ser un campo de tipo numérico'
  }
  /**
   * Si el autor enviado existe realmente en la bd
   */
  if (!await UserDao.userExists(author)) {
    return 'El autor indicado no existe en la bd'
  }

  return null
}
