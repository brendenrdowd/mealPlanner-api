const RecipesService = {
  getRecipeByDate(db,date,user_id){
    return db('mealplan_recipes')
    .where({user_id})
    .andWhere({date})
    .first()
  },
  insertRecipe(db,newRecipe){
    return db
    .insert(newRecipe)
    .into('mealplan_recipes')
    .returning('*')
    .then(([recipe]) => recipe)
  },
  serializeRecipe(recipe){
    return {
      recipes: recipe.recipes,
      date: recipe.date,
    }
  }
}

module.exports = RecipesService