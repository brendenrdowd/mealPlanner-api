const RecipesService = {
  getRecipeByDate(db,date,user_id){
    return db('mealplan_recipes')
    .where({user_id})
    .andWhere({date})
  },
  insertRecipe(db,newRecipe){
    return db
    .insert(newRecipe)
    .into('mealplan_recipes')
    .returning('*')
    .then(([recipe]) => recipe)
  },
  deleteRecipe(db,recipeId){
    return db
    .from('mealplan_recipes')
    .where('id',recipeId)
    .del()
    .then(function (count) {
      console.log(count);
    })
  },
  serializeRecipe(recipe){
    return {
      id:recipe.id,
      recipe: recipe.recipes,
      date: recipe.date,
    }
  }
}

module.exports = RecipesService