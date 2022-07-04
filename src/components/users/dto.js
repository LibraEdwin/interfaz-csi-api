// @ts-check
import { getBaseUriApi } from 'helpers/utils'

const ENDPOINT_USERS = `${getBaseUriApi()}/users`

/**
 *
 * @param {import('./types').User} user
 */
export function single (user) {
  return {
    id: user._id,
    email: user.email,
    profile: user.profile,
    name: user.name,
    lastName: user.lastName
  }
}

export function multiple (resources) {
  const {
    docs,
    totalDocs,
    limit,
    totalPages,
    page,
    // pagingCounter,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage
  } = resources
  return {
    info: {
      totalDocs,
      totalPages,
      page,
      limit
    },
    links: {
      prev: hasPrevPage ? `${ENDPOINT_USERS}?limit=${limit}&page=${prevPage}` : null,
      current: `${ENDPOINT_USERS}?limit=${limit}&page=${page}`,
      next: hasNextPage ? `${ENDPOINT_USERS}?limit=${limit}&page=${nextPage}` : null
    },
    users: docs.map(user => single(user))
  }
}
