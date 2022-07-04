// @ts-check
import { getBaseUriApi } from 'helpers/utils'

const ENDPOINT_TAGS = `${getBaseUriApi()}/tags`

/**
 * Formateo para una sola etiqueta
 * @param {import('./types').Tag} tag
 */
export function single (tag) {
  return {
    id: tag._id,
    name: tag.name
  }
}

/**
 * Formateo para una lista de etiquetas
 * @param {object} resources
 * @returns {object}
 */
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
      prev: hasPrevPage ? `${ENDPOINT_TAGS}?limit=${limit}&page=${prevPage}` : null,
      current: `${ENDPOINT_TAGS}?limit=${limit}&page=${page}`,
      next: hasNextPage ? `${ENDPOINT_TAGS}?limit=${limit}&page=${nextPage}` : null
    },
    tags: docs.map(news => single(news))
  }
}
