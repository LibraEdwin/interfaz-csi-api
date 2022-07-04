import passport from 'passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import config from 'config'
/**
 * Autenticación con jwt
 */
const JSWT = config.get('JSWT')

passport.use(new JwtStrategy(
  {
    secretOrKey: JSWT.SESSION_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  async function (tokenPayload, done) {
    return done(null, tokenPayload.user)
  }
))

export const isAuthorize = passport.authorize('jwt', { session: false })
