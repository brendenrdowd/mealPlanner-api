const RecipesService = {
  getRecipeById(db,id){
    return db('mealplan_Recipes')
    .where({id})
    .first()
  },
  insertRecipe(db,newRecipe){
    return db
    .insert(newUser)
    .into('mealplan_users')
    .returning('*')
    .then(([user]) => user)
  },
}

module.exports = RecipesService