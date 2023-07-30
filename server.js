// Import packages
const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();
require('dotenv').config()

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connects to database
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

    db.query(`SELECT * FROM department`, function (err, result) {

        console.log(result);
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
                viewAllDepartments();
            }

        });

        return primaryPrompt();

    })
};

function viewAllJobs() {

    db.query(`SELECT * FROM job`, function (err, result) {

        console.log(result);
        return primaryPrompt();

    });
};

function addJob() {

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

                if (data.length < 1) {
                    console.log(message);
                } else { 
                    return true
                }; 
            }
        },
        {
            type: 'list',
            message: 'Which department does the job belong to?',
            name: 'department',
            choices: ''
        },
    ])

};

function primaryPrompt() {

inquirer.prompt([

    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'startingChoices',
        choices: ['view all departments','add departmet', 'view all jobs', 'add job', 'view all employees', 'add employee job', 'update an employee job']
    },

]).then((answer) => {

    if (answer.startingChoices === 'view all departments') {

        viewAllDepartments();

        
    } else if (answer.startingChoices === 'add departmet') {

        addDepartment();

    } else if (answer.startingChoices === 'view all jobs') {

        viewAllJobs();

    } else if (answer.startingChoices === 'add job') {

        addJob();

    }
});
};

primaryPrompt();

// find way to query ADD/DELETE into inquirer
// find way to show schema tables
//