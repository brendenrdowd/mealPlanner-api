BEGIN;

TRUNCATE
  mealplan_users
  RESTART IDENTITY CASCADE;

INSERT INTO mealplan_users (email, name, diet, interolances, password)
VALUES
  ('test@gmail.com', 'John Doe', null, 'spinach, nuts','$2a$12$rElD8EFoxq.Ncj9I24ix9OUPerIpx07ulHScWN12Vv1WxB5Dlvkt.'),
  ('vegan@gmail.com', 'Karen Sway', 'vegan', null,'$2a$12$kJ90rrqyN.9g74mnjySVIOfsZjNVfjaCmjks4CR5XhsKGIYHWc5XK');

COMMIT;