DROP TABLE IF EXISTS employees;
DROP TYPE IF EXISTS gender;

CREATE TYPE gender AS ENUM ('male', 'female', 'other');

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  title TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  gender gender NOT NULL,
  birth_date DATE NOT NULL,
  date_of_employment DATE,
  termination_date DATE,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  emergency_contact_relation TEXT,
  address TEXT,
  postal_code TEXT,
  city TEXT
);

-- INSERT INTO employees (first_name, last_name, phone, gender, birth_date) VALUES
--   ('Jahn Arne', 'Johnsen', '98219394', 'Male', '1982-03-31'),
--   ('Magne Kristoffer', 'Davidsen', '40221672', 'Male', '1984-06-20'),
--   ('Jon Bernholdt', 'Olsen', '98219371', 'Male', '1978-09-23'
-- );
