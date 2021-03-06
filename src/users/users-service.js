const xss = require('xss')
const bcrypt = require('bcryptjs')
const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%^&])[\S]+/

const UsersService = {
  getUserByEmail(db,email){
    return db('mealplan_users')
    .where({email})
    .first()
    .then(user => !!user)
  },
  getUserById(db,id){
    return db('mealplan_users')
    .where({id})
    .first()
  },
  insertUser(db,newUser){
    return db
    .insert(newUser)
    .into('mealplan_users')
    .returning('*')
    .then(([user]) => user)
  },
  validatePassword(password) {
    if (password.length < 8) {
      return 'Password must be longer than 8 characters'
    }
    if (password.length > 72) {
      return 'Password must be less than 72 characters'
    }
    if(password.startsWith(' ') || password.endsWith(' ')){
      return 'Password must not start or end with empty spaces'
    }
    if(!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)){
      return 'Password must contain 1 uppercase, lowercase, number and special character'
    }
    return null
  },
  hashPassword(password){
    return bcrypt.hash(password,12)
  },
  serializeUser(user){
    return {
      id:user.id,
      name:xss(user.name),
      email:xss(user.email),
      diet:xss(user.diet),
      interolances:xss(user.interolances),
      date_created:new Date(user.date_created)
    }
  },
}

module.exports = UsersService