const inquirer = require('inquirer');
const conn = require('./persist');
const apple = require('./connection')

let userQuestions = [
    {
        type: "list",
        name: 'option',
        message: 'what action would you like to preform?',
        choices: [
            {
                name: 'view all departments',
                value: 'VIEW_ALL_DEPARTMENTS'
            },
            {
                name: 'view all roles',
                value: 'VIEW_ALL_ROLE'
            },
            {
                name: 'view all employees',
                value: 'VIEW_ALL_EMPLOYEE'
            },
            {
                name: 'add a department',
                value: 'ADD_DEPARTMENT'
            },
            {
                name: 'add a role',
                value: 'ADD_A_ROLE'
            },
            {
                name: 'add an employee',
                value: 'ADD_AN_EMPLOYLEE'
            },
            {
                name: 'update employee role',
                value: 'UPDATE_EMPLOYEE_ROLE'
            },
            {
                name: 'exit the program',
                value: 'EXIT_THE_PROGRAM'
            },


        ]
    }
]

function displayUserCommands() {
    inquirer.prompt(userQuestions)
        .then(response => {
            let userChoice = response.option;

            switch (userChoice) {
                case 'VIEW_ALL_DEPARTMENTS':
                    viewAllDepartments();
                    break;
                case 'VIEW_ALL_ROLE':
                    viewAllRoles();
                    break;
                case 'VIEW_ALL_EMPLOYEE':
                    viewAllEmployees();
                    break;
                default:
                    exitTheProgram();
                    break;

            }
        })
}

function viewAllDepartments() {
    apple.query('SELECT * FROM DEPARTMENT', (err, results) => {
        if (err) throw err;
        console.table(results)
    });
}

function viewAllRoles() {
    apple.query('SELECT * FROM ROLE', (err, results) => {
        if (err) throw err;
        console.table(results)
    });
}

function viewAllEmployees() {
    apple.query('SELECT * FROM EMPLOYEE', (err, results) => {
        if (err) throw err;
        console.table(results)
    });
}
function exitTheProgram() {
    process.exit();
}

displayUserCommands();