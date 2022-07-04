// @ts-check
/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function index (req, res) {
  res.respond({ data: [] })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function getById (req, res) {
  return res.respond({ data: {} })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export function create (req, res) {
  return res.respondCreated({ data: {} })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export function updateById (req, res) {
  return res.respondUpdated({ data: {} })
}

/**
 *
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export function removeById (req, res) {
  return res.respondDeleted({ data: {} })
}