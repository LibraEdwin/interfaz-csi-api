/**
 * @fileoverview Archivo principal de manejo de rutas de toda la app
 * @version     1.0
 * @author      Interfaz
 *
 */
import { Router } from 'express'
import config from 'config'
import routesProfiles from 'components/profiles/routes'
import routesUsers from 'components/users/routes'
import routesTags from 'components/tags/routes'
import routesAds from 'components/ads/routes'
import routesAdTypes from 'components/ad-types/routes'
import routesAdDetails from 'components/ad-details/routes'
import routesNews from 'components/news/routes'
import routesBuckets from 'components/buckets/routes'

const VERSION = config.get('VERSION')

/**
 * Enrutador de la aplicación
 * @param {import('express').Application} app
 *
 * @return {voi}
 */
function router (app) {
  /**
   * Instancia del router main donde estaran todas las rutas
   */
  const routerMain = Router()

  routerMain.get('/', (req, res) => {
    return res.json({
      version: VERSION,
      info: {
        name: 'Rest Api CSI',
        description: 'api description',
        author: 'Interfaz Team'
      }
    })
  })

  routerMain.use('/profiles', routesProfiles)
  routerMain.use('/users', routesUsers)
  routerMain.use('/tags', routesTags)
  routerMain.use('/ads', routesAds)
  routerMain.use('/ad-types', routesAdTypes)
  routerMain.use('/ad-details', routesAdDetails)
  routerMain.use('/news', routesNews)
  routerMain.use('/buckets', routesBuckets)

  app.use(`/api/${VERSION}`, routerMain)
}

export default router
