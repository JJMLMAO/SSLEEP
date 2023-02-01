CREATE DATABASE ssleep;

CREATE TABLE login (
    student_email serial PRIMARY KEY,
    student_password VARCHAR(50) NOT NULL,
);