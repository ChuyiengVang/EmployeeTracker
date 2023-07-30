INSERT INTO department (department_name)
VALUES ("Service"),
       ("Sales");

INSERT INTO job (title, salary, department_id)
VALUES ("Advisor", 50000, 1),
       ("Technician", 60000, 1),
       ("Salesman", 55000, 2); 

INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES ("Chue", "Vang", 1, NULL),
       ("John", "Doe", 2, NULL); 