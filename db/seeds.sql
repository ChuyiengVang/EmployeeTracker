INSERT INTO department (department_name)
VALUES ("Service"),
       ("Sales"),
       ("Detail"),
       ("Human Resources");

INSERT INTO job (title, salary, department_id)
VALUES ("Advisor", 50000, 1),
       ("Technician", 60000, 1),
       ("Salesman", 55000, 2),
       ("Car Washer", 35000, 3),
       ("Cashier", 40000, 2),
       ("Admin", 90000, 4);

INSERT INTO employee (first_name, last_name, job_id, manager_id)
VALUES ("Chue", "Vang", 1, NULL),
       ("John", "Doe", 2, 1),
       ("Tony", "Stark", 6, NULL),
       ("Thor", "Odinson", 4, NULL),
       ("Nick", "Fury", 3, NULL),
       ("Phill", "Coulson", 3, 2),
       ("Steven", "Rogers", 1, 1),
       ("Tiffany", "Joan", 5, 2),
       ("Bucky", "Barnes", 4, 3);
