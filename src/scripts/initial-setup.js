import chalk from 'chalk'
import * as ProfileDao from 'components/profiles/dao'
import * as AdTypeDao from 'components/ad-types/dao'
import * as TagDao from 'components/tags/dao'
import * as UserDao from 'components/users/dao'
import profiles from '../../data/profiles.json'
import tags from '../../data/tags.json'
import adTypes from '../../data/ad-types.json'
import users from '../../data/users.json'

export async function initialSetup () {
  console.log(chalk.yellowBright('Configuration Initial...'))
  if (await ProfileDao.correlativeId() === 1) {
    // si no hay datos registrados, entonces guardamos los valores
    console.info(chalk.greenBright('[Insert to DB] => Perfiles de usuario cargados...'))
    for (let index = 0; index < profiles.length; index++) {
      await ProfileDao.createProfile(profiles[index])
    }
  }

  if (await TagDao.correlativeId() === 1) {
    // si no hay datos registrados, entonces guardamos los valores
    console.info(chalk.greenBright('[Insert to DB] => Etiquetas cargadas...'))
    for (let index = 0; index < tags.length; index++) {
      await TagDao.createTag(tags[index])
    }
  }

  if (await AdTypeDao.correlativeId() === 1) {
    // si no hay datos registrados, entonces guardamos los valores
    console.info(chalk.greenBright('[Insert to DB] => Tipos de anuncios cargados...'))
    for (let index = 0; index < adTypes.length; index++) {
      await AdTypeDao.createAdType(adTypes[index])
    }
  }

  if (await UserDao.correlativeId() === 1) {
    // si no hay datos registrados, entonces guardamos los valores
    console.info(chalk.greenBright('[Insert to DB] => Usuarios de prueba cargados...'))
    for (let index = 0; index < users.length; index++) {
      await UserDao.createUser(users[index])
    }
  }
}
