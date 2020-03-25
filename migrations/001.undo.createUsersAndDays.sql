DROP TABLE IF EXISTS mealplan_recipes;
ALTER TABLE mealplan_recipes
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS mealplan_users;
