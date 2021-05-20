const mysql = require('mysql');
const inquirer = require('inquirer');
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

const runCRM = () => {
    console.log('CRM is now online...')
    inquirer
        .prompt(
            {
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: 
                    [
                        "View All Employees",
                        "View All Employees by Department",
                        "View All Employees by Manager",
                        "Add Employee",
                        "Remove Employee",
                        "Update Emplyee Role",
                        "Update Employee Manager",
                        "Exit"
                    ]
            }
        )
        .then((answer) => {
            switch (answer.action) {
                case "View All Employees":
                    allEmployees();
                    break;
                case "View All Employees by Department":
                    allEmByDept();
                    break;
                case "View All Employees by Manager":
                    allEmByManager();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Remove Employee":
                    removeEmployee();
                    break;
                case "Update Emplyee Role":
                    updateEmRole();
                    break;
                case "Update Employee Manager":
                    updateEmManager();
                    break;
                case "Exit":
                    connection.end();
            }
        });
};

connection.connect((err) => {
    if(err) throw err;
    runCRM();
});
