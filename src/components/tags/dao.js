// @ts-check
import TagModel from './model'

/**
 * Obtener la lista de todas las etiquetas
 * @param {number} limit
 * @param {number} page
 *
 * @returns {Promise<object>}
 */
export async function findAllTags (limit, page) {
  const options = {
    page: page || 1,
    limit: limit || 10,
    sort: { createdAt: 'desc' }
  }

  return await TagModel.paginate({ isDeleted: false }, options)
}

/**
 * Obtener una etiqueta por su id
 * @param {number} id
 * @returns {Promise<import('./types').Tag>}
 */
export async function getTagById (id) {
  /**
   * @constant
   * @type {import('./types').Tag}
   */
  const tag = await TagModel.findOne({ _id: id, isDeleted: false })

  return tag
}

/**
 *
 * @param {import('./types').Tag} tag
 * @returns {Promise<import('./types').Tag>}
 */
export async function createTag (tag) {
  const { name } = tag
  const _id = await correlativeId()

  const tagCreated = new TagModel({
    _id,
    name
  })

  return await tagCreated.save()
}

/**
 *
 * @param {number} id
 * @param {import('./types').Tag} tag
 * @returns {Promise<import('./types').Tag>}
 */
export async function updateTagById (id, tag) {
  /**
   * @constant
   * @type {import('./types').Tag}
   */
  const tagUpdated = await TagModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    {
      name: tag.name
    },
    {
      new: true,
      runValidation: true
    }
  )

  return tagUpdated
}

/**
 *
 * @param {number} id
 * @returns {Promise<boolean>}
 */
export async function removeTagById (id) {
  const result = await TagModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    {
      rawResult: true // Return the raw result from the MongoDB driver
    }
  )

  return result.lastErrorObject.updatedExisting
}

/**
 *
 * @param {number} id
 * @returns {Promise<any>}
 */
export async function existAndIsNotDeleted (id) {
  return await TagModel.exists({ _id: id, isDeleted: false })
}

/**
 *
 * @returns {Promise<Number>}
 */
export async function correlativeId () {
  const totalDocuments = await TagModel.countDocuments()
  return totalDocuments + 1
}

/**
 *
 * @returns {Promise<void>}
 */
export async function clearCollection () {
  await TagModel.deleteMany()
}
