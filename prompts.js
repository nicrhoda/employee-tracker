const inquirer = require('inquirer');
const mysql = require('mysql2');
// moved function to connect to mysql to hide password
const db = require('./mysql'); 
// main prompts for start page
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
                return console.log('goodbye');
                break;
        };
    });
};

// function for viewEmployees
const viewEmployees = () => {
    db.query('SELECT * FROM employee', function(err, res) {
        if (err) throw err;
        if (res) console.table(res);
        mainPrompt();
    });
}
// function for addEmployee
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
        db.query(input, { id: res.id, first_name: res.firstname, last_name: res.lastname, manager_id: res.manager, role_id: res.role }, function(err, res) {
            if (err) throw err;
            if (res) console.log('new member added');
        });
        mainPrompt();
    });
};
// function for updateRole
const updateRole = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'id',
            message: 'Enter employee id:'
        },
        {
            type: 'input',
            name: 'newRole',
            message: 'Enter new employee role'
        }
    ]).then(function(res) {
        let input = '';
        db.query(input, { id: res.id, title: res.newRole}, function(err, res) {
            if (err) throw err;
            mainPrompt();
        })
    })
}
// function for viewRoles
const viewRoles = () => {
    db.query('SELECT title FROM role', function(err, res) {
        if (err) throw err;
        if (res) console.table(res);
        mainPrompt();
    });
};
// function for addRole
const addRole = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'newRole',
            message: 'Enter new role:'
        }
    ]).then(function(res) {
        let input = 'INSERT INTO role SET ?';
        db.query(input, {title: res.newRole}, function(err, res) {
            if (err) throw err;
            if (res) console.log('new role added');
            mainPrompt();
        })
    })
}
// function for viewDepartments
const viewDepartments = () => {
    db.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        if (res) console.table(res);
        mainPrompt();
    });
}
// function for addDepartment
const addDepartment = () => {
    inquirer.prompt ([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'Enter new department:'
        }
    ]).then(function(res) {
        let input = 'INSERT INTO department SET ?';
        db.query(input, {name: res.newDepartment}, function(err, res) {
            if (err) throw err;
            if (res) console.log('new department added');
            mainPrompt();
        });
    })
}

// start prompts
mainPrompt();