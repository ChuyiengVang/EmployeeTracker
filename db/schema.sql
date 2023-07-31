DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
    );

CREATE TABLE job (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    job_id INT,
    INDEX job_ind (job_id),
    CONSTRAINT fk_jobs FOREIGN KEY (job_id) REFERENCES job(id) ON DELETE CASCADE,
    manager_id INT,
    INDEX manager_ind (manager_id),
     FOREIGN KEY (manager_id) REFERENCES employee(id)
);
