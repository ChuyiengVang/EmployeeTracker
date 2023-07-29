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

    });

}

inquirer.prompt([

    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'startingChoices',
        choices: ['view all departments','add departmet', 'view all jobs', 'add job', 'view all employees', 'add employee job', 'update an employee job']
    },

]).then((answer) => {

    if(answer.startingChoices === 'view all departments') {

        viewAllDepartments();
        return prompt();
    }
});

//find way to query ADD/DELETE into inquirer