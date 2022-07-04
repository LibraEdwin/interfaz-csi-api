/**
 * @fileoverview Archivo de Configuración, conección a mongodb
 */
import mongoose from 'mongoose'
import chalk from 'chalk'

export function connectionMongo (uri) {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false
  }

  mongoose.connect(uri, options)
    .then(() => {
      console.info(chalk.yellow('[database]: ') + `MongoDB => ${uri}`)
    }).catch(err => {
      console.error(`🔥 [database]: ${chalk.red(`Oh!!! ocurrió un error con MongoDB razón: ${err}`)}`)
    })
}

export async function disconnectMongo () {
  await mongoose.disconnect()
}
