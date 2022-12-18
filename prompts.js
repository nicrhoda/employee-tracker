const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'NicBen04',
        database: 'employee_db'
    },
    console.log('connected to employee database')
);

const mainPrompt = () => {
    inquirer.prompt ([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
        }
    ]).then(function(res) {
        switch (res.choices) {
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Quit':
                quit();
                break;
        }
    })
}

// add function for viewEmployees
const viewEmployees = () => {
    db.query('SELECT ')
}
// add function for addEmployee
const addEmployee = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'id',
            message: 'Enter id for employee:'
        },
        {
            type: 'input',
            name: 'firstname',
            message: 'Enter employee first name:'
        },
        {
            type: 'input',
            name: 'lastname',
            message: 'Enter employee last name:'
        },
        {
            type: 'input',
            name: 'department',
            message: 'Enter department:'
        },
        {
            type: 'input',
            name: 'role',
            message: 'Enter employee role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter employee salary:'
        },
        {
            type: 'input',
            name: 'manager',
            message: 'Enter employee manager:'
        }
    ]).then(function(res) {
        let input = 'INSERT INTO employee SET ?';
        db.query(input, { id: res.id, first_name: res.firstname, last_name: res.lastname, department: res.department, title: res.role, salary: res.salary, manager: res.manager}, function(err, res) {
            if (err) throw err;
            mainPrompt();
        });
    });
};
// add function for updateRole

// add function for viewRoles
// add function for addRole
// add function for viewDepartments
// add function for addDepartment
// add function for quit
mainPrompt();