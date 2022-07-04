// @ts-check
import AdTypeModel from './model'
/**
 *
 * @param {import('./types').AdType} adType
 * @returns {Promise<import('./types').AdType>}
 */
export async function createAdType (adType) {
  const { name, dimensions } = adType
  const _id = await correlativeId()

  const adTypeCreated = new AdTypeModel({
    _id,
    name,
    dimensions
  })

  return await adTypeCreated.save()
}

/**
 *
 * @returns {Promise<Number>}
 */
export async function correlativeId () {
  const totalDocuments = await AdTypeModel.countDocuments()
  return totalDocuments + 1
}

/**
 *
 * @returns {Promise<void>}
 */
export async function clearCollection () {
  await AdTypeModel.deleteMany()
}
