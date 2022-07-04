// @ts-check
import NewsModel from './model'
import * as TagDao from 'components/tags/dao'

/**
 * Obtener la lista de todas las noticias
 * @param {number} limit
 * @param {number} page
 * @param {object} query
 *
 * @returns {Promise<object>}
 */
export async function findAllNews (limit, page, all, query) {
  const options = {
    page: page || 1,
    limit: limit || 10,
    sort: { createdAt: 'desc' },
    pagination: !all
  }

  return await NewsModel.paginate({ ...query, isDeleted: false }, options)
}

/**
 * Obtener una noticia por su id
 * @param {number} id
 * @param {object} query
 * @returns {Promise<import('./types').News>}
 */
export async function getNewById (id, query) {
  /**
   * @constant
   * @type {import('./types').News}
   */
  const news = await NewsModel.findOne({ _id: id, isDeleted: false, ...query })

  return news
}

/**
 * Crear una noticia
 * @param {import('./types').News} news
 *
 * @returns {Promise<import('./types').News>}
 */
export async function createNews (news) {
  /**
   * @constant
   * @param {import('./types').News} news
   */
  const newsCreated = await NewsModel.create({
    _id: news._id,
    title: news.title,
    thumbnailUrl: news.thumbnailUrl,
    excerpt: news.excerpt,
    content: news.content,
    permalink: news.permalink,
    linkVideo: news.linkVideo,
    keywords: news.keywords,
    tags: news.tags,
    author: news.author,
    ad: news.ad
  })

  return newsCreated

  // return await NewsModel.findById(newsCreated._id)
  //   .populate({
  //     path: 'tags',
  //     match: { isDeleted: false },
  //     select: 'name'
  //   })
}

/**
 *
 * @param {number} id
 * @param {import('./types').News} news
 * @returns {Promise<import('./types').News>}
 */
export async function updateById (id, news) {
  /**
   * @constant
   * @type {import('./types').News}
   */
  const newsUpdated = await NewsModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    {
      title: news.title,
      thumbnailUrl: news.thumbnailUrl,
      excerpt: news.excerpt,
      content: news.content,
      permalink: news.permalink,
      linkVideo: news.linkVideo,
      keywords: news.keywords,
      tags: news.tags,
      author: news.author,
      ad: news.ad
    },
    {
      new: true,
      runValidation: true
    }
  )

  return newsUpdated
}

/**
 *
 * @param {number} id
 * @returns {Promise<boolean>}
 */
export async function removeNew (id) {
  const result = await NewsModel.findOneAndUpdate(
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
 * @param {boolean} visibility
 * @returns {Promise<boolean>}
 */
export async function changeVisibility (id, visibility) {
  const result = await NewsModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { visibility },
    {
      rawResult: true // Return the raw result from the MongoDB driver
    }
  )

  return result.lastErrorObject.updatedExisting
}

/**
 * Obtener la lista de todas las noticias
 * @param {number} idTag
 * @param {number} limit
 * @param {number} page
 * @param {object} query
 *
 * @returns {Promise<object>}
 */
export async function findAllByTag (idTag, limit, page, query) {
  // validamos si el id de la etiqueta no está eliminada
  const isValidIdTag = await TagDao.existAndIsNotDeleted(idTag)

  if (!isValidIdTag) {
    return null
  }

  const options = {
    page: page || 1,
    limit: limit || 10,
    sort: { createdAt: 'desc' }
  }

  query = {
    ...query,
    isDeleted: false,
    tags: idTag
  }

  return await NewsModel.paginate(query, options)
}
