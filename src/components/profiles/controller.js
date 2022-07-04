// @ts-check
import * as ProfilesDao from './dao'

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function index (req, res) {
  const allProfiles = await ProfilesDao.getAllProfiles()
  return res.respond({ data: allProfiles })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function getById (req, res) {
  const { id } = req.params
  const perfil = await ProfilesDao.findProfile(id)
  return res.respond({ data: perfil })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function create (req, res) {
  /** @type {import('./types').Profile} */

  const profileData = req.body
  const profileCreated = await ProfilesDao.createProfile(profileData)
  return res.respondCreated({ data: profileCreated })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function updateById (req, res) {
  const { id } = req.params
  const data = req.body

  const updateProfile = await ProfilesDao.updateProfile(id, data)

  return res.respondUpdated({ data: updateProfile })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function removeById (req, res) {
  const { id } = req.params
  const deleteProfile = await ProfilesDao.deleteProfile(id)
  return res.respondDeleted({ data: deleteProfile })
}
