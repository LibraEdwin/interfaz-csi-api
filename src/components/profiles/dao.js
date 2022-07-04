// @ts-check
import ProfileModel from './model'

export async function getAllProfiles () {
  return await ProfileModel.find()
}

export async function findProfile (codigo) {
  return await ProfileModel.findOne({ _id: codigo })
}

export async function updateProfile (codigo, data) {
  return await ProfileModel.findOneAndUpdate({ _id: codigo }, data, {
    new: true,
    runValidation: true
  })
}

export async function deleteProfile (codigo) {
  return await ProfileModel.deleteOne({ _id: codigo })
}

/**
 *
 * @param {import('./types').Profile} profile
 * @returns {Promise<import('./types').Profile>}
 */
export async function createProfile (profile) {
  const { name } = profile
  const _id = await correlativeId()

  const profileCreated = new ProfileModel({
    _id,
    name
  })

  return await profileCreated.save()
}

/**
 *
 * @returns {Promise<Number>}
 */
export async function correlativeId () {
  const totalDocuments = await ProfileModel.countDocuments()
  return totalDocuments + 1
}

/**
 *
 * @returns {Promise<void>}
 */
export async function clearCollection () {
  await ProfileModel.deleteMany()
}
