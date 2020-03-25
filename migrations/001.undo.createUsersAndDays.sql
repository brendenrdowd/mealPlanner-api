DROP TABLE IF EXISTS mealplan_day;
ALTER TABLE mealplan_day
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS mealplan_users;
