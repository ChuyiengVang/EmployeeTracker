const inquirer = require('inquirer');
const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createConnection(

    {
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_DATABASE
    },

    console.log(`Connected to the employees_db database.`)

);

function viewAllDepartments() {

    db.query(`SELECT department.id, department.department_name FROM department`, function(err, result) {

        console.table(result);
        return primaryPrompt();

    });
};

function addDepartment() {

    inquirer.prompt([

        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'addDepartment',
            validate: (data) => {

                const message = `
                Please enter department name!!!`;

                if (data.length < 1) {
                    console.log(message);
                } else { 
                    return true
                };

            }
        },

    ]).then((answer) => {

        const newDeptartment = answer.addDepartment;

        db.query(`INSERT INTO department (department_name) VALUES(?)`, newDeptartment, (err, result) => {

            if(err) {
                console.log(err);
            } else{
                console.log('New department added!!!');
            }

        });

        return primaryPrompt();

    })
};

function viewAllJobs() {

    db.query(`SELECT job.id, job.title, department.department_name, job.salary FROM job JOIN department ON job.department_id = department.id `, function(err, result) {

        console.table(result);
        return primaryPrompt();

    });
};

function addJob() {

    db.query(`SELECT job.id, job.title, department.department_name, job.salary FROM job JOIN department ON job.department_id = department.id`, function(err, result) {

        console.table(result);

    inquirer.prompt([

        {
            type: 'input',
            message: 'What is the name of the job?',
            name: 'addJob',
            validate: (data) => {

                const message = `
                Please enter job name!!!`;

                if (data.length < 1) {
                    console.log(message);
                } else { 
                    return true
                }; 
            }
        },
        {
            type: 'input',
            message: 'What is the salary of the job?',
            name: 'jobSalary',
            validate: (data) => {

                const message = `
                Please enter job salary!!!`;

                if (data.length < 4) {
                    console.log(message);
                } else { 
                    return true
                }; 
            }
        },
        {
            type: 'input',
            message: 'Which department id does the job belong to?',
            name: 'department'
        },
    ]).then((answer) => {

        db.query(`INSERT INTO job (title, salary, department_id) VALUES(?,?,?)`, [answer.addJob, answer.jobSalary, answer.department], (err, result) => {

            if(err) {
                console.log(err);
            } else {
                console.log('New job listed');
            }

        });

        primaryPrompt()

    });
    }); 
};

function viewEmployees() {

    db.query(`SELECT employee.id, employee.first_name, employee.last_name, job.title, department.department_name, job.salary, employee.manager_id FROM employee JOIN job ON employee.job_id = job.id JOIN department ON job.department_id = department.id ORDER BY employee.id ASC`, function(err, result) {

        console.table(result);
        return primaryPrompt();

    });

};

function addEmployee() {

    db.query(`SELECT * FROM job`, function(err, result) {

        console.table(result);

        inquirer.prompt([
            {
                type: 'input',
                message: 'What is the employees first name?',
                name: 'firstName'
            },
            {
                type: 'input',
                message: 'What is the employees last name?',
                name: 'lastName'
            },
            {
                type: 'input',
                message: 'What is their job id?',
                name: 'job'
            },
            {
                type: 'input',
                message: 'What is their manager id?',
                name: 'manager'
            },
        ]).then((answer) => {

            db.query(`INSERT INTO employee (first_name, last_name, job_id, manager_id) VALUES(?, ?, ?, ?)`, [answer.firstName, answer.lastName, answer.job, answer.manager], (err, result) => {

                if(err) {
                    console.log(err);
                } else {
                    console.log('New employee added!!!');
                }
            });

            primaryPrompt();

        })
    })
};

function updateEmployee() {

    db.query(`SELECT * FROM employee`, function (err, result) {

        console.table(result);

        inquirer.prompt([
            {
                type: 'input',
                message: 'Id of the employee you want to update?',
                name: 'firstName'
            },
            {
                type: 'input',
                message: 'Which job id do you want to assign the selected employee?',
                name: 'job'
            }
        ]).then((answer) => {

            db.query(`UPDATE employee SET job_id = ? WHERE id = ?`, [answer.job, answer.firstName], (err, result) => {

                if(err) {
                    console.log(err);
                } else {
                    console.log('Employee job updated!!!');
                };

            });

            primaryPrompt();
            
        });
    })
}

function primaryPrompt() {

inquirer.prompt([

    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'startingChoices',
        choices: ['view all departments','add department', 'view all jobs', 'add job', 'view all employees', 'add an employee', 'update an employee job']
    },

]).then((answer) => {

    if (answer.startingChoices === 'view all departments') {

        viewAllDepartments();

        
    } else if (answer.startingChoices === 'add department') {

        addDepartment();

    } else if (answer.startingChoices === 'view all jobs') {

        viewAllJobs();

    } else if (answer.startingChoices === 'add job') {

        addJob();

    } else if (answer.startingChoices === 'view all employees') {

        viewEmployees()

    } else if (answer.startingChoices === 'add an employee') {

        addEmployee()

    } else if(answer.startingChoices === 'update an employee job') {

        updateEmployee()

    };
});
};

primaryPrompt();