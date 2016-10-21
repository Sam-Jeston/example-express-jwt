import * as express from 'express'

const jwt = require('express-jwt')
const jwtGenerator = require('jsonwebtoken')
const app = express()
const secret = new Buffer('b3VyRmlyc3RTZWNyZXQ=', 'base64')

function generateJwt() {
  return jwtGenerator.sign({
    app_metadata: {
      user_id: '12345'
    }
  }, secret, {
    expiresIn: 12 * 60 * 60 * 1000,
    algorithm: 'HS256'
  })
}

app.use(jwt({
  secret: secret
}).unless({ path: [/^\/login/] }))

app.post('/login', function(req, res) {
  // For now all login are successful
  res.set('Authorization', `Bearer ${generateJwt()}`)
  res.status(201).json()
})

app.get('/data', function(req, res) {
  res.status(200).json({ hello: 'world' })
})

app.post('/logout', function(req, res) {
  res.set('Authorization', '')
})

app.listen(3000, function () {
  console.log('JWT listening on port 3000!')
})
