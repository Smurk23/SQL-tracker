const inquier = require('inquier');
const conn = require('./persist');

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
                name: 'exit the program',
                value: 'EXIT_THE_PROGRAM'
            },

        ]
    }
]
