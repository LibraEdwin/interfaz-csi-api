// @ts-check
import config from 'config'
import { getBaseUriApi, getDate } from 'helpers/utils'

const URL_UPLOADS = config.get('DOMAIN_IMAGES')
const ENDPOINT_NEWS = `${getBaseUriApi()}/news`

/**
 * Formateo para una sola noticia
 * @param {import('./types').News} news
 */
export function single (news) {
  return {
    id: news._id,
    title: news.title,
    thumbnail: URL_UPLOADS + news.thumbnailUrl,
    author: news.author,
    excerpt: news.excerpt,
    content: news.content,
    visibility: news.visibility,
    tags: news.tags,
    video: news.linkVideo,
    keywords: news.keywords,
    permalink: news.permalink,
    published: getDate(news.createdAt),
    editionDate: getDate(news.updatedAt)
  }
}

/**
 * Formateo para una lista de noticias
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
      prev: hasPrevPage ? `${ENDPOINT_NEWS}?limit=${limit}&page=${prevPage}&visibility=true` : null,
      current: `${ENDPOINT_NEWS}?limit=${limit}&page=${page}&visibility=true`,
      next: hasNextPage ? `${ENDPOINT_NEWS}?limit=${limit}&page=${nextPage}&visibility=true` : null
    },
    news: docs.map(news => single(news))
  }
}
