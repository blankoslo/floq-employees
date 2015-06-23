DROP TABLE IF EXISTS employees;

CREATE TABLE employees (id SERIAL, first_name VARCHAR(254) NOT NULL, last_name VARCHAR(254) NOT NULL);

INSERT INTO employees (first_name, last_name) VALUES
  ('Jahn Arne', 'Johnsen'),
  ('Magne Kristoffer', 'Davidsen'),
  ('Jon Bernholdt', 'Olsen');
