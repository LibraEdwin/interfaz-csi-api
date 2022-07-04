// @ts-check
import AdDetailModel from './model'
/**
 *
 * @param {import('./types').AdDetail} adDetail
 * @returns {Promise<import('./types').AdDetail>}
 */
export async function create (adDetail) {
  const { imagePath, adId, adType, active } = adDetail
  const _id = await correlativeId()

  const adDetailCreated = new AdDetailModel({
    _id,
    imagePath,
    adId,
    adType,
    active
  })

  return await adDetailCreated.save()
}

/**
 *
 * @returns {Promise<Number>}
 */
export async function correlativeId () {
  const totalDocuments = await AdDetailModel.countDocuments()
  return totalDocuments + 1
}
