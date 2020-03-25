CREATE TABLE mealplan_day (
  id SERIAL PRIMARY KEY,
  recipes TEXT,
  date TIMESTAMP NOT NULL
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

ALTER TABLE mealplan_day
  ADD COLUMN
    user_id INTEGER REFERENCES mealplan_users(id)
    ON DELETE SET NULL;

