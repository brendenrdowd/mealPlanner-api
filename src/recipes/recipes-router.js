const express = require('express')
const path = require('path')
const RecipesService = require('./recipes-service')
const { requireAuth } = require('../middleware/jwt-auth')

const recipesRouter = express.Router()
const jsonBodyParser = express.json()

recipesRouter
  .route('/:date')
  // .all(checkRecipeExists)
  .all(requireAuth)
  .get((req, res,next) => {
    console.log("getRecipeByDate",req.user.id,req.params.date)
    RecipesService.getRecipeByDate(
      req.app.get('db'),
      req.params.date,
      req.user.id
    ).then(recipes =>{ 
      (!recipes) ? res.status(404).json({
        error: `No Recipes saved for this date`
      }) : 
      res.json(recipes)
    })
    .catch(next)
  })
// update?

// delete
recipesRouter
.route('/:recipeId')
.all(requireAuth)
.delete((req,res,next) =>{
  RecipesService.deleteRecipe(
    req.app.get('db'),
    req.params.recipeId
  )
})

recipesRouter
  .route('/')
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { user_id, date, recipeId } = req.body
    const newPlan = { user_id, date, recipes: recipeId }

    for (const [key, value] of Object.entries(newPlan))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })

    RecipesService.insertRecipe(
      req.app.get('db'),
      newPlan
    )
      .then(plan => {
        res
          .status(201)
          .json(RecipesService.serializeRecipe(plan))
      })
  })

async function checkRecipeExists(req, res, next) {
  try {
    const thing = await RecipesService.getRecipeByDate(
      req.app.get('db'),
      req.params.date
    )

    if (!date)
      return res.status(404).json({
        error: `No saved recipes for that date`
      })

    res.thing = thing
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = recipesRouter