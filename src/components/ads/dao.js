// @ts-check
// @ts-check
import AdModel from './model'
/**
 *
 * @param {import('./types').Ad} ad
 * @returns {Promise<import('./types').Ad>}
 */
export async function create (ad) {
  const { dateAd, nameAd } = ad
  const _id = await correlativeId()

  const adTCreated = new AdModel({
    _id,
    dateAd,
    nameAd
  })

  return await adTCreated.save()
}

/**
 *
 * @returns {Promise<Number>}
 */
export async function correlativeId () {
  const totalDocuments = await AdModel.countDocuments()
  return totalDocuments + 1
}

/**
 *
 * @returns {Promise<void>}
 */
export async function clearCollection () {
  await AdModel.deleteMany()
}
