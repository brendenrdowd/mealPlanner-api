CREATE TABLE mealplan_recipes (
  id SERIAL PRIMARY KEY,
  recipes TEXT,
  date DATE NOT NULL
);

CREATE TABLE mealplan_users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  diet TEXT,
  interolances TEXT,
  date_created TIMESTAMP NOT NULL DEFAULT now(),
  date_modified TIMESTAMP
);

ALTER TABLE mealplan_recipes
  ADD COLUMN
    user_id INTEGER REFERENCES mealplan_users(id)
    ON DELETE SET NULL;

