// @ts-check
import * as TagDao from './dao'
import * as TagDto from './dto'

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function index (req, res) {
  /**
   * @constant - limite / número de resultados que queremos
   * @type {number}
   */

  const limit = Number(req.query.limit)
  /**
    * @constant - página que deseamos
    * @type {number}
    */
  const page = Number(req.query.page)

  /**
    * Buscar etiquetas en la bd
    * @constant
    * @type {object}
    */
  const tags = await TagDao.findAllTags(limit, page)

  /**
    * Formatear la respuesta
    * @constant
    * @type {object}
    */
  const data = TagDto.multiple(tags)

  return res.respond({ data })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function getById (req, res) {
  /**
   * @constant
   * @type {number}
   */
  const id = Number(req.params.id)

  /**
   * Verificar si el id es un número
   */
  if (isNaN(id)) {
    return res.failValidationError({ errors: 'No es un id válido' })
  }
  /**
   * @constant
   * @type {import('./types').Tag}
   */
  const tag = await TagDao.getTagById(id)

  /**
   * Si no hay una etiqueta entonces retornamos un 404 con un mensaje
   */
  if (!tag) {
    return res.failNotFound({ errors: 'La etiqueta no fue encontrada' })
  }

  /**
   * Formatear la respuesta
   * @constant
   * @type {object}
   */
  const data = TagDto.single(tag)

  return res.respond({ data })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function create (req, res) {
  /**
   * @constant
   * @type {import('./types').Tag}
   */
  const tagData = req.body

  if (!tagData.name) {
    /**
     * Si el nombre está vacío retornamos error
     */
    return res.failValidationError({ errors: 'El nombre de la etiqeta es requerida' })
  }
  /**
   * @constant
   * @type {import('./types').Tag}
   */
  const tagCreated = await TagDao.createTag(tagData)

  /**
   * Formatear la respuesta
   * @constant
   * @type {object}
   */
  const data = TagDto.single(tagCreated)

  return res.respondCreated({ data })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function updateById (req, res) {
  /**
   * @constant
   * @type {import('./types').Tag}
   */
  const tagData = req.body
  /**
   * @constant
   * @type {number}
   */
  const id = Number(req.params.id)

  /**
   * Verificar si el id es un número
   */
  if (isNaN(id)) {
    return res.failValidationError({ errors: 'No es un id válido' })
  }

  if (tagData.name !== undefined && !tagData.name) {
    /**
     * Si el nombre está vacío retornamos error
     */
    return res.failValidationError({ errors: 'El nombre de la etiqeta no puede estar vacía' })
  }

  /**
   * Actualizamos la etiqueta
   * @constant
   * @type {import('./types').Tag}
   */
  const tagUpdated = await TagDao.updateTagById(id, tagData)

  /**
   * Si el id no está en la bd entonces no pudo actualizar ninguna etiqueta
   */
  if (!tagUpdated) {
    return res.failNotFound({ errors: `No se pudo actualizar la etiqueta porque encontró una que coincida con el id ${id}` })
  }

  /**
   * Formateamos la respuesta
   * @constant
   * @type {object}
   */
  const data = TagDto.single(tagUpdated)

  return res.respondUpdated({ data })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function removeById (req, res) {
  /**
   * @constant
   * @type {number}
   */
  const id = Number(req.params.id)

  /**
   * Verificar si el id es un número
   */
  if (isNaN(id)) {
    return res.failValidationError({ errors: 'No es un id válido' })
  }
  /**
   * @constant
   * @type {boolean}
   */
  const isTagDeleted = await TagDao.removeTagById(id)

  /**
   * Si el id no está en la bd entonces no pudo eliminar ninguna etiqueta
   */
  if (!isTagDeleted) {
    return res.failNotFound({ errors: `No se pudo eliminar la etiqueta porque encontró una que coincida con el id ${id}` })
  }

  return res.respondDeleted({ message: 'Se eliminó la etiqueta' })
}
