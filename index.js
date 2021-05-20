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
}

connection.connect((err) => {
    if(err) throw err;
    runCRM();
})
