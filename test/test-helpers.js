const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      email: 'test1@gmail.com',
      name: 'Test user 1',
      password: 'Password1',
      diet:null,
      interolances:null
    },
    {
      id: 2,
      email: 'test2@gmail.com',
      name: 'Test user 2',
      password: 'Password2',
      diet:null,
      interolances:null
    }
  ]
}

function makeRecipeArray(users) {
  return [
    {
      id: 1,
      user_id: users[0].user_id,
      recipe: '695646',
      date: '2020-04-03'
    },
    {
      id: 2,
      user_id: users[1].user_id,
      recipe: '547899',
      date: '2020-04-03'
    },
    {
      id: 3,
      user_id: users[1].user_id,
      recipe: '488633',
      date: '2020-04-03'
    },
    {
      id: 4,
      user_id: users[1].user_id,
      recipe: '592348',
      date: '2020-04-03'
    },
  ]
}

function makeRecipeFixtures() {
  const testUsers = makeUsersArray()
  const testRecipes = makeRecipeArray(testUsers)

  return { testUsers, testRecipes }
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      mealplan_users,
      mealplan_recipes
      RESTART IDENTITY CASCADE;`
  )
}

function seedUsers(db, users) {
  const hashedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('mealplan_users').insert(hashedUsers)
}

function seedRecipeTables(db, users, recipes) {
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('recipes').insert(recipes)
  })
}


function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.name,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeRecipeArray,
  makeRecipeFixtures,
  cleanTables,
  seedRecipeTables,
  seedUsers,
  makeAuthHeader,
}