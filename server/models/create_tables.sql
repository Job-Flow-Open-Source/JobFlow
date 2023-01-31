CREATE TABLE users (
  "_id" serial PRIMARY KEY,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "username" varchar NOT NULL UNIQUE,
  "password" varchar NOT NULL
);

CREATE TABLE applications (
  "_id" serial PRIMARY KEY,
  "user_id" int REFERENCES users(_id) ON DELETE CASCADE,
  "resume_id" int REFERENCES resumes(_id) ON DELETE CASCADE,
  "coverletter_status" varchar default 'No Cover Letter',
  "progress_status" varchar NOT NULL,
  "date_submitted" DATE default current_date,
  "submission_method" varchar,
  "company" varchar NOT NULL,
  "job_title" varchar
);

CREATE TABLE resumes (
  "_id" serial PRIMARY KEY,
  "user_id" int REFERENCES users(_id) ON DELETE CASCADE,
  "success_rate" int DEFAULT 0,
  "resume_name" varchar NOT NULL
);