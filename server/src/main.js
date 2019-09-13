const dotenv = require('dotenv')
const express = require('express')
const app = express()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const { User } = require('../models/')
const history = require('connect-history-api-fallback')
const path = require('path')
const jwt = require('jsonwebtoken')
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const staticFileMiddleware = express.static(path.join(__dirname))

dotenv.config()
app.use(passport.initialize())

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_CLIENTSECRET,
  callbackURL: 'http://' + process.env.HOST + ':' + process.env.PORT + '/auth/google/callback'
}, function (accessToken, refreshToken, profile, done) {
  User.findOrCreate({
    where: {
      identity: profile.id,
      provider: profile.provider
    }
  }).then(([user, created]) => {
    return done(false, user)
  })
}))

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
},
function (jwtPayload, cb) {
  return User.findByPk(jwtPayload.id)
    .then(user => {
      if (jwtPayload['exp'] > Date.now()) {
        return cb(null, user)
      } else {
        return cb(new Error('Token expired'))
      }
    })
    .catch(err => {
      return cb(err)
    })
}
))

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
  passport.authenticate('google', { scope: ['openid'] }))

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  function (req, res) {
    const token = jwt.sign({
      id: req.user.id,
      exp: Date.now() + (24 * 60 * 60 * 1000)
    }, process.env.JWT_SECRET)
    res.cookie('access_token', token)
    res.redirect('/')
    return res
  }
)

const api = require('./api')
app.use('/api', passport.authenticate('jwt', { session: false }), api)
app.use(staticFileMiddleware)
app.use(history())
app.use(staticFileMiddleware)

app.use('/', express.static(path.join(__dirname, '../../public')))
app.use('/dist', express.static(path.join(__dirname, '../../dist')))

app.listen(process.env.PORT, () => console.log('running minimalist finance on port ' + process.env.PORT))
