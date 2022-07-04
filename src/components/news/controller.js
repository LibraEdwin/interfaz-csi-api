// @ts-check
import * as NewsDao from './dao'
import * as NewsDto from './dto'
import * as NewsService from './services'
import { deleteFileTemp, DIR_UPLOAD_TEMP } from 'helpers/uploads'
import { generateUrlName } from 'helpers/utils'
import Bucket from 'backing/google/cloud-storage'
import path from 'path'

/**
 * Listas noticias de la bd
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function index (req, res) {
  /**
   * @constant - limite / número de resultados que queremos
   * @type {object}
   *
   * @property {number} limit - limite / número de resultados que queremos
   * @property {number} page - página que deseamos
   * @property {boolean} all - queremos todos los resultados sin paginación
   * @property {object} query - resto del query que se envíe
   */
  const { limit, page, all, ...query } = req.query

  /**
   * Buscar noticias en la bd
   * @constant
   * @type {object}
   */
  const news = await NewsDao.findAllNews(Number(limit), Number(page), Boolean(all), { ...query })

  /**
   * Formatear la respuesta
   * @constant
   * @type {object}
   */
  const data = NewsDto.multiple(news)

  return res.respond({ data })
}

/**
 * Obtener una noticia por su id
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function getById (req, res) {
  /**
   * @constant
   * @type {number}
   */
  const id = Number(req.params.id)
  const { ...query } = req.query

  /**
   * Verificar si el id es un número
   */
  if (isNaN(id)) {
    return res.failValidationError({ errors: 'No es un id válido' })
  }
  /**
   * @constant
   * @type {import('./types').News}
   */
  const news = await NewsDao.getNewById(id, { ...query })

  /**
   * Si no hay una noticia entonces retornamos un 404 con un mensaje
   */
  if (!news) {
    return res.failNotFound({ errors: 'La noticia no fue encontrada' })
  }

  /**
   * Formatear la respuesta
   * @constant
   * @type {object}
   */
  const data = NewsDto.single(news)

  return res.respond({ data })
}

/**
 * Crear una noticia en la bd
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function create (req, res) {
  /**
   * @constant
   * @type {import('./types').News}
   */
  const dataNews = req.body
  const fileThumbnail = req.file

  /**
   * validamos los datos de la noticia a crear
   */
  const errors = await NewsService.validateNewsCreate(dataNews, fileThumbnail)

  if (errors.length > 0) {
    if (fileThumbnail) {
      /**
       * Si hay errores en los datos enviados y se envió la img del thumbnail,
       * entonces quitamos la imagen cargada en la carpeta 'temp'
       */
      await deleteFileTemp(fileThumbnail.filename)
    }
    /**
     * retornamos la respuesta con los errores
     */
    return res.failValidationError({ errors })
  }

  if (fileThumbnail) {
    /**
     * Si se envió una imagen entonces agregamos la ruta del archivo al news
     * al objeto dataNews
     */
    dataNews.thumbnailUrl = `/uploads/news/${dataNews._id}/1.jpg`

    /**
     * copiamos la imagen de la carpeta 'temp' a la nube de google
     */
    try {
      const fileTemp = path.join(DIR_UPLOAD_TEMP, fileThumbnail.filename)
      const destinationFolder = `uploads/news/${dataNews._id}/`

      console.log(fileTemp)
      console.log(destinationFolder)
      await Bucket.uploadFile('1.jpg', fileTemp, destinationFolder)

      /**
       * Si la carga fue exitosa entonces eliminamos el archivo subido de la carpeta 'temp'
       */
      await deleteFileTemp(fileThumbnail.filename)
    } catch (err) {
      return res.failServerError({ errors: ['hubo un error al momento de cargar la imagen principal', err] })
    }
  }

  /**
   * Generamos el url de la noticia a partir del titulo y el id
   */
  dataNews.permalink = generateUrlName(dataNews._id, dataNews.title)

  /**
   * Creamos la noticia en la bd
   * @constant
   * @type {import('./types').News}
   */
  const newsCreated = await NewsDao.createNews(dataNews)

  /**
   * Formatear la respuesta
   * @constant
   * @type {object}
   */
  const data = NewsDto.single(newsCreated)

  return res.respondCreated({ data })
}

/**
 * Actualizar una noticia por su id
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function updateById (req, res) {
  const dataNews = req.body
  const fileThumbnail = req.file
  const id = Number(req.params.id)

  /**
   * Verificar si el id es un número
   */
  if (isNaN(id)) {
    return res.failValidationError({ errors: 'No es un id válido' })
  }

  /**
   * validamos los datos de la noticia a crear
   */
  const errors = await NewsService.validateNewsUpdate(dataNews)

  if (errors.length > 0) {
    return res.failValidationError({ errors })
  }

  if (dataNews.title) {
    dataNews.permalink = generateUrlName(id, dataNews.title)
  }

  /**
   * Actualizamos la noticia
   */
  const newsUpdated = await NewsDao.updateById(id, dataNews)

  if (!newsUpdated) {
    if (fileThumbnail) {
      /**
       * Si no existe el usuario creado y se envió la img del thumbnail,
       * entonces quitamos la imagen cargada en la carpeta 'temp'
       */
      await deleteFileTemp(fileThumbnail.filename)
    }

    return res.failNotFound({ errors: `No se encontró una noticia con el id - ${id}` })
  }

  if (fileThumbnail) {
    /**
     * Si todo salio correctamente y se actualizaron los datos entonces
     * copiamos la imagen de la carpeta 'temp' a la nube de google
     */
    try {
      const fileTemp = path.join(DIR_UPLOAD_TEMP, fileThumbnail.filename)
      const destinationFolder = `uploads/news/${id}/`

      await Bucket.uploadFile('1.jpg', fileTemp, destinationFolder)

      /**
       * Si la carga fue exitosa entonces eliminamos el archivo subido de la carpeta 'temp'
       */
      await deleteFileTemp(fileThumbnail.filename)
    } catch (err) {
      return res.failServerError({ errors: ['hubo un error al momento de actualizar la imagen principal', err] })
    }
  }

  /**
   * Formateamos la respuesta
   */
  const data = NewsDto.single(newsUpdated)

  return res.respondUpdated({ data })
}

/**
 * Eliminar una noticia por su id
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function removeById (req, res) {
  /**
   * @constant
   * @type {number}
   */
  const id = Number(req.params.id)

  /**
   * Verificar si el id es un número
   */
  if (isNaN(id)) {
    return res.failValidationError({ errors: 'No es un id válido' })
  }
  /**
   * @constant
   * @type {boolean}
   */
  const newsIsDeleted = await NewsDao.removeNew(id)

  /**
   * Si no hay una noticia entonces no podemos eliminarla
   */
  if (!newsIsDeleted) {
    return res.failNotFound({ errors: `No se pudo eliminar la noticia porque encontró una que coincida con el id ${id}` })
  }

  return res.respondDeleted({ message: 'Se eliminó la noticia' })
}

/**
 * Cambiar la visibilidad de una noticia por su id
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function changeVisibilityById (req, res) {
  /**
   * @constant
   * @type {number}
   */
  const id = Number(req.params.id)
  const { visibility } = req.body

  /**
   * Verificar si el id es un número
   */
  if (isNaN(id)) {
    return res.failValidationError({ errors: 'No es un id válido' })
  }
  /**
   * @constant
   * @type {boolean}
   */
  const visibilityIsChanged = await NewsDao.changeVisibility(id, visibility)

  /**
   * Si no hay una noticia entonces no podemos cambiarle la visibilidad
   */
  if (!visibilityIsChanged) {
    return res.failNotFound({ errors: `No se pudo cambiar la visibilidad de la noticia porque encontró una que coincida con el id ${id}` })
  }

  return res.respondUpdated({ message: 'Se cambió la visibilidad de la noticia' })
}

/**
 * Obtener la lista de noticias relacionadas a una etiqueta
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function getByTagId (req, res) {
  /**
   * @constant
   * @type {number}
   */
  const idTag = Number(req.params.idTag)
  /**
   * @constant - limite / número de resultados que queremos
   * @type {object}
   *
   * @property {number} limit - limite / número de resultados que queremos
   * @property {number} page - página que deseamos
   * @property {object} query - resto del query que se envíe
   */
  const { limit, page, ...query } = req.query

  /**
   * Verificar si el id es un número
   */
  if (isNaN(idTag)) {
    return res.failValidationError({ errors: 'No es un id válido' })
  }

  const news = await NewsDao.findAllByTag(idTag, Number(limit), Number(page), { ...query })

  /**
   * Si no hay resultados entonces podemos decir que el id es incorrecto
   */
  if (!news) {
    return res.failNotFound({ errors: `El id de la etiqueta es incorrecto porque no está en la bd - id ${idTag}` })
  }

  /**
   * Formatear la respuesta
   * @constant
   * @type {object}
   */
  const data = NewsDto.multiple(news)

  return res.respond({ data })
}
