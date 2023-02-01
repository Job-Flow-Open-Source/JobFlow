CREATE TABLE users (
  "_id" serial PRIMARY KEY,
  "first_name" varchar NOT NULL,
  "last_name" varchar NOT NULL,
  "username" varchar NOT NULL UNIQUE,
  "password" varchar NOT NULL
);

CREATE TABLE resumes (
  "_id" serial PRIMARY KEY,
  "user_id" int REFERENCES users(_id) ON DELETE CASCADE,
  "success_rate" int DEFAULT 0,
  "resume_name" varchar NOT NULL,
  UNIQUE (_id, user_id, resume_name);
);

CREATE TABLE applications (
  "_id" serial PRIMARY KEY,
  "user_id" int,
  "resume_id" int,
  "resume_name" varchar, 
  "link": varchar,
  "coverletter_status" varchar DEFAULT 'No Cover Letter',
  "progress_status" int DEFAULT 0,
  "date_submitted" DATE DEFAULT current_date,
  "submission_method" varchar,
  "company" varchar NOT NULL,
  "job_title" varchar,
  FOREIGN KEY (user_id, resume_id, resume_name) REFERENCES resumes(user_id, _id, resume_name) ON DELETE CASCADE;
);
