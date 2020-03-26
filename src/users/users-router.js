const express = require('express')
const path = require('path')
const UsersService = require('./users-service')
const { requireAuth } = require('../middleware/jwt-auth')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const { password, confirm, email, name, diet, interolances } = req.body
    // checks for missing required fields
    for (const field of ['name', 'email','confirm', 'password']) {
      if (!req.body[field]) {
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })
      }
    }
    // checks for correct password
    if(confirm !== password)
      return res.status(400).json({ error: 'Passwords must match' })
    const passwordError = UsersService.validatePassword(password)
    if (passwordError)
      return res.status(400).json({ error: passwordError })
    // checking for existing email
    UsersService.getUserByEmail(
      req.app.get('db'),
      email
    )
      .then(user_email => {
        if (user_email)
          return res.status(400).json({ error: 'Email already exists' })
      })
    // if required fields are filled out, and email is original, then hash password, create user
    return UsersService.hashPassword(password)
      .then(hashedPassword => {
        const newUser = {
          email,
          password: hashedPassword,
          name,
          diet,
          interolances,
          date_created: 'now()'
        }
        return UsersService.insertUser(
          req.app.get('db'),
          newUser
        )
          .then(user => {
            res.status(201)
              .location(path.posix.join(req.originalUrl, `/`))
              .json(UsersService.serializeUser(user))
          })
      })
      .catch(next)
  })

usersRouter
  .route('/:user_id')
  .all(requireAuth)
  .all(checkuserExists)
  .get((req, res) => {
    res.json(UsersService.serializeUser(res.user))
  })

async function checkuserExists(req, res, next) {
  try {
    const user = await UsersService.getUserById(
      req.app.get('db'),
      req.params.user_id
    )
    
    if (!user)
      return res.status(404).json({
        error: `user doesn't exist`
      })
    res.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = usersRouter