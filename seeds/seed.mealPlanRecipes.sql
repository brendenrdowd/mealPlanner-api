BEGIN;

TRUNCATE
  mealplan_recipes
  RESTART IDENTITY CASCADE;

INSERT INTO mealplan_recipes (recipes,date,user_id)
VALUES
  ('695646', '2020-04-03', 1),
  ('547899', '2020-04-03', 2),
  ('488633', '2020-04-03', 2),
  ('592348', '2020-04-03', 2);

COMMIT;