import passport from 'passport'
import { BasicStrategy } from 'passport-http'

/**
 * Autenticación Basica
 */
passport.use(new BasicStrategy(
  function (email, password, done) {
    const user = { email, password }

    return done(null, user)
  }
))

export const authBasic = passport.authenticate('basic', { session: false })
