const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

let currentDepartmentId = 5;
let currentEmployeeId = 9;
let currentRoleId = 9;

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'application_db'
  },
  console.log(`Connected to the employee_db database.`)
);

const askQuestion = () => {
  inquirer
    .prompt([{
        type: 'list',
        message: "Select an option.",
        choices: ['View Departments', 'Add Departments', 'View Employees', "Add Employee", "View Roles", "Add Role"],
        name: 'request',
    }])
    .then(choice => {
        if (choice.request === 'View Departments') {
            db.query('SELECT * FROM `departments`', function(err, results, fields) {
                if (err) {
                    console.error(err);
                    return;
                }
                console.table(results);
                askQuestion();
            });
        } else if (choice.request === 'View Roles') {
          db.query('select roles.id, roles.title, departments.name, roles.salary from roles left join departments ON roles.department_id = departments.id', function (err, results, fields) {
            if (err) {
              console.error(err)
              return
            }
            console.table(results)
            askQuestion();
          })

        } else if (choice.request === 'View Employees') {
          db.query('select employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, managers.first_name AS manager_first_name, managers.last_name AS manager_last_name from employees left join roles on employees.role_id = roles.id LEFT JOIN employees AS managers ON employees.manager_id = managers.id', function(err, results, fields) {
            if (err) {
              console.error(err)
              return
            }
            console.table(results)
            askQuestion();
          })
        } else if (choice.request === "Add Departments") {
          inquirer
              .prompt([{
                type: 'input',
                message: "What is the name of the department?",
                name: 'd_name'
              },
            ]).then((answers) => {
              db.query(`INSERT INTO departments VALUES(${currentDepartmentId}, '${answers.d_name}')`, function(err, results, fields) {
                  if (err) {
                      console.error(err);
                      return;
                  }
                  currentDepartmentId++
                  askQuestion();
              });
          })
        } else if (choice.request === "Add Employee") {
          const roles = {
            
          }
          db.query('select id, title from roles', function(err, results, fields) {
            
            for (result of results) {
              console.log(result)
              roles[result.title] = result.id
            }
            
            inquirer
                .prompt([{
                  type: 'input',
                  message: "What is the first name of the employee?",
                  name: 'f_name'
                },
                {
                  type: 'input',
                  message: "What is the last name of the employee?",
                  name: 'l_name'
                },
                {
                  type: 'list',
                  message: "What role is the employee in?",
                  // choices: ['Finance', 'Sales', 'Engineering', 'Legal'],
                  choices: Object.keys(roles),
                  name: 'e_role'
                },
              ]).then((answers) => {
                const query = 'INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?, ?)';
                const values = [currentEmployeeId, answers.f_name, answers.l_name, roles[answers.e_role], 5];
            
                db.query(query, values, function(err, results, fields) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    currentEmployeeId++
                    askQuestion();
                });
            });
      })
    } else if (choice.request === "Add Role") {
          const departments = {

          }

          db.query('select id, name from departments', function(err, results, fields) {
            for (result of results) {
              departments[result.name] = result.id
            }
            inquirer
              .prompt([{
                type: 'input',
                message: "What is the role name?",
                name: 'r_name'
              },
              {
                type: "list",
                message: "What department will this role belong to?",
                choices: Object.keys(departments),
                name: 'department'
              },
              {
                type: 'choice',
                message: "What is their starting salary?",
                name: "salary"
              }
            ]).then((answers) => {
              const rolesQuery = 'insert into roles (id, title, department_id, salary) VALUES (?, ?, ?, ?)';
              const values = [currentRoleId, answers.r_name, departments[answers.department], answers.salary]

              db.query(rolesQuery, values, function(err, results, fields) {
                if (err) {
                    console.error(err);
                    return;
                }
                currentRoleId++
                askQuestion();
              });
            })
          })
          
        }
    });
}



askQuestion();