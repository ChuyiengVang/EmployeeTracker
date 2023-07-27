const inquirer = require('inquirer');

inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'update an employee role']
    },
]);

//find way to query ADD/DELETE into inquirer