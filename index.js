const mysql = require('mysql');
const inquirer = require('inquirer');
require('console.table');
require('dotenv').config();


const connection = mysql.createConnection(
    {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
    }
);


const updateEmRole = () => {
    let sql = 'SELECT first_name, last_name, CONCAT(r.title) AS roles FROM employees LEFT JOIN roles r ON employees.role_id = r.id';
    let employeeID = 0;
    connection.query(sql, (err, results) => {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: 'employee',
                    type: 'list',
                    message: 'What employee do you want to update?',
                    choices() {
                        const choiceArray = [];
                        results.forEach(({first_name, last_name}) => {
                            choiceArray.push(first_name + ' ' + last_name)
                        })
                        return choiceArray;
                    }
                },
                {
                    name: 'newRole',
                    type: 'list',
                    message: 'What new role do you want to assign?',
                    choices() {
                        const choiceArray = [];
                        results.forEach(({roles}) => {
                            choiceArray.push(roles)
                        })
                        return choiceArray;
                    }
                }
            ])
            .then((answer) => {
                let counter = 0;
                results.forEach(({id}) => {
                    counter++;
                    if (counter === answer.employee.length){
                        console.log(counter);
                        connection.query(
                            'UPDATE employees set ? WHERE employee = ?',
                            [
                                {
                                    role_id: counter,
                                },
                                {   
                                    employee: answer.employee,
                                    
                                },
                            ],
                                (err) => {
                                    if (err) throw err;
                                    console.log('Employee updated');
                                    runCRM();
                                }
                        )
                    }
                })
            })
    });
};

const addEmployee = () => {
    inquirer
        .prompt([
            {
                name: 'first',
                type: 'input',
                message: 'Enter the employees first name.',
            },
            {
                name: 'last',
                type: 'input',
                message: 'Enter the employees last name.',
            },
            {
                name: 'role',
                type: 'input',
                message: 'Enter their role ID.',
            },
            {
                name: 'manager',
                type: 'input',
                message: 'Enter their manager ID.',
            }
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO employees SET ?',
                {
                    first_name: answer.first,
                    last_name: answer.last,
                    role_id: answer.role,
                    manager_id: answer.manager
                },
                (err) => {
                    if (err) throw err;
                    console.log('New employee added to the database.');
                    runCRM();
                }
            );
        });
};

const allEmployees = () => {
    connection.query(
        'SELECT e.id, CONCAT(e.first_name, " ", e.last_name) AS employee, r.title, CONCAT(d.name) AS department, r.salary, CONCAT(m.first_name , " " , m.last_name) AS manager FROM employees e JOIN roles r ON e.role_id = r.id JOIN departments d ON r.dept_id = d.id LEFT JOIN employees m ON e.manager_id = m.id',
        (err, res) => {
            if (err) throw err;
            console.table(res);
            runCRM();
        }
    );
};

const runCRM = () => {
    inquirer
        .prompt(
            {
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: 
                    [
                        "View All Employees",
                        "Add Employee",
                        "Update Emplyee Role",
                        "Exit"
                    ]
            }
        )
        .then((answer) => {
            switch (answer.action) {
                case "View All Employees":
                    allEmployees();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Emplyee Role":
                    updateEmRole();
                    break;
                case "Exit":
                    connection.end();
            }
        });
};

connection.connect((err) => {
    if(err) throw err;
    console.log('CRM is now online...')  
    runCRM();
});