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
                value: 'ADD_AN_EMPLOYEE'
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
                case 'ADD_DEPARTMENT':
                    addDepartment();
                    break;
                case 'ADD_A_ROLE':
                    addRole();
                    break
                case 'ADD_AN_EMPLOYEE':
                    addEmployee();
                    break
                case 'UPDATE_EMPLOYEE_ROLE':
                    updateEmployeeRole();
                    break
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
        displayUserCommands()
    });
}

function viewAllRoles() {
    apple.query('SELECT * FROM ROLE', (err, results) => {
        if (err) throw err;
        console.table(results)
        // .then(() => {
            displayUserCommands()
        // })
    });
}

function viewAllEmployees() {
    apple.query('SELECT * FROM EMPLOYEE', (err, results) => {
        if (err) throw err;
        console.table(results)
        displayUserCommands()
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: 'dept_name',
            message: 'what would you like to name this new department?'
        }    
    ])
        .then(res => { apple.query('INSERT INTO DEPARTMENT(name) VALUES (?)', res.dept_name, (err, results) => {
                if (err) throw (err)
                console.table(results)
                    console.log('successfully added department to database!')
                    displayUserCommands()
                
            })
            // conn.addDepartment(deptName)
                // .then(() => {
                    // console.log('successfully added department to database!')
                // })
                // .then(() => {
                    // displayUserCommands()
                // })
});
}


function addRole() {
    // conn.getAllDepartments()
    apple.query('SELECT DEPARTMENT.ID, DEPARTMENT.NAME FROM DEPARTMENT;', (err, rows) => {
            let departments = rows;
            console.log(rows);
            let choices = departments.map(({
                ID, NAME
            }) => ({
                name: NAME,
                value: ID
            }));

            console.log(choices);

            inquirer.prompt([
                {
                    type: "input",
                    name: "title",
                    message: "what is the name of new role ?"
                },
                {
                    type: "input",
                    name: "salary",
                    message: "what is  salary of new role?"
                },
                {
                    name: "department_id",
                    type: "list",
                    message: "select department to which the role belongs",
                    choices: choices
                }
            ])
                .then(role => {
                    // conn.addRole(role)
                    apple.query('INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)', [role.title, role.salary, role.department_id], () => {
                        console.log("successfully added the role")
                        displayUserCommands()
                    })
                })
        })
}

function addEmployee() {
    apple.query('SELECT ROLE.ID, ROLE.TITLE FROM ROLE', (err, rows) => {
        let roles = rows;
        console.log(rows);
        let choices = roles.map(({
            ID, TITLE
        }) => ({
            name: TITLE,
            value: ID
        }));

        console.log(choices);

        apple.query('SELECT * FROM EMPLOYEE', (err, rows) => {
            let employee = rows;
            console.log(rows);
            let options = employee.map(({
                id, first_name, last_name
            }) => ({
                name: first_name + ' ' + last_name,
                value: id
            }));
    

        inquirer.prompt([
            {
                type: "input",
                name: "FirstName",
                message: "what is the new employees first name ?"
            },
            {
                type: "input",
                name: "LastName",
                message: "what is the new employees last name ?"
            },
            {
                name: "Role",
                type: "list",
                message: "Select role for new employee",
                choices: choices
            },
            {
                name: 'manager',
                type: 'list',
                message: 'Select employees manager',
                choices: [
                    ...options, 
                    {
                        name: 'No manger',
                        value: null
                    }
                ]
            }

        ])
            .then(employee => {
                // conn.addRole(role)
                apple.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [employee.FirstName, employee.LastName, employee.Role, employee.manager], () => {
                    console.log("successfully added this employee")
                    displayUserCommands()
                })
            })
        })

    })
}

function updateEmployeeRole() {
    apple.query('SELECT ROLE.ID, ROLE.TITLE FROM ROLE', (err, rows) => {
        let roles = rows;
        console.log(rows);
        let choices = roles.map(({
            ID, TITLE
        }) => ({
            name: TITLE,
            value: ID
        }));

        console.log(choices);

        apple.query('SELECT * FROM EMPLOYEE', (err, rows) => {
            let employee = rows;
            console.log(rows);
            let options = employee.map(({
                id, first_name, last_name
            }) => ({
                name: first_name + ' ' + last_name,
                value: id
            }));
    

        inquirer.prompt([
            {
                type: "list",
                name: "Update",
                message: "which employee do you want to update ?",
                choices: options
            },
            {
                name: "Role",
                type: "list",
                message: "Select new role for employee",
                choices: choices
            },
            

        ])
            .then(employee => {
                // conn.addRole(role)
                apple.query('UPDATE employee SET role_id = ? WHERE id = ?', [employee.Role, employee.Update], () => {
                    console.log("successfully updated this employee")
                    displayUserCommands()
                })
            })
        })

    })

}

function exitTheProgram() {
    process.exit();
}

displayUserCommands();