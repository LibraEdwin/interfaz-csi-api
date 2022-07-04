const path = require('path')

const VERSION = 'v2'

const SERVER = {
  HOST: 'localhost',
  PORT: 3002,
  HTTPS: false
}

const DOMAIN = 'http://localhost:3002'

const TZ = 'America/Lima'

const DATABASE = {
  MONGODB_URI: 'mongodb+srv://dbDev:235411@serverlessinstance0.xjgs0.mongodb.net/circolo_v2_dev?retryWrites=true&w=majority',
  MYSQL_URI: ''
}

const LOGGER = 'dev'

const JSWT = {
  SESSION_SECRET: 'secret',
  SESSION_EXPIRE_IN: '2h'
}

const BUCKET = {
  NAME: 'container-csi-public',
  PATH_KEY: path.join(__dirname, '../project-app-web-circolo-41a340388dc4.json')
}

const DOMAIN_IMAGES = 'https://storage.googleapis.com/container-csi-public'

module.exports = {
  SERVER,
  DOMAIN,
  TZ,
  DATABASE,
  LOGGER,
  JSWT,
  VERSION,
  BUCKET,
  DOMAIN_IMAGES
}
