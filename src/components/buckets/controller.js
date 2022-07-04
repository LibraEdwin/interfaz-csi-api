// @ts-check
import Bucket from 'backing/google/cloud-storage'
import { DIR_UPLOAD_TEMP } from 'helpers/uploads'
import path from 'path'
/**
 * Obtener todos los buckets
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function index (req, res) {
  try {
    const [buckets] = await Bucket.getBuckets()

    const data = buckets.map((bucket) => {
      return bucket.metadata.name
    })

    return res.respond({ data })
  } catch (err) {
    return res.failServerError({ errors: err })
  }
}

/**
 * Obtener los archivos de un bucket
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function getFiles (req, res) {
  const { folder } = req.query

  try {
    const files = await Bucket.getFiles(folder + '/', true)
    return res.respond({ data: files })
  } catch (err) {
    return res.failServerError({ errors: [`No se pudieron obtener los archivos del folder ${folder}`, err] })
  }
}

/**
 * Subir archivos a un bucket
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function uploadFile (req, res) {
  try {
    const fileTemp = path.join(DIR_UPLOAD_TEMP, '1.jpg')
    const destinationFolder = 'news/148751/'

    await Bucket.uploadFile('second-carga.jpg', fileTemp, destinationFolder)

    return res.status(200).json({ message: 'Se subió el archivo' })
  } catch (err) {
    return res.failServerError({ errors: ['No se pudo subir el archivo', err] })
  }
}

/**
 * Subir multiples archivos bucket
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function uploadFiles (req, res) {
  return res.respond({ data: [] })
}

/**
 * Eliminar un archivo de un bucket
 * @param {import('express').Request} req
 * @param {import('./types').Response} res
 */
export async function removeFile (req, res) {

}
