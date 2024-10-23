const { prompt, default: inquirer} = require('inquirer');
const path = require('path'); 
const db = require('./db/db.js');
const consoleTable = require('console.table');
const pool = require('./db/db.js'); 

console.log('----------------')
console.log('Employee Tracker')
console.log('----------------')
function init() {
    inquirer.prompt([
        {
            type: 'list', 
            name: 'options', 
            message: 'What would you like to do?', 
            choices: [
                {
                    name: 'View All Employees',
                    value: 'VIEW_ALL_EMPLOYEES',
                },
                {
                    name: 'Add Employee', 
                    value: 'ADD_EMPLOYEE',
                },
                {
                    name: 'Update Employee Role', 
                    value: 'UPDATE_EMPLOYEE_ROLE',
                }, 
                {
                    name: 'View All Roles',
                    value: 'VIEW_ALL_ROLES',
                },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE',
                },
                {
                    name: 'View All Departments',
                    value: 'VIEW_ALL_DEPARTMENTS',
                },
                {
                    name: 'Add Department',
                    value: 'ADD_DEPARTMENT',
                }, 
                {
                    name: 'Quit', 
                    value: 'QUIT',
                }
            ]
        },
    ]).then((answers)=>{
        let option = answers.options;
        switch (option) {
            case 'VIEW_ALL_EMPLOYEE':
                viewAllEmployees();
                break;
            case 'ADD_EMPLOYEE':
                addEmployee();
                break;
            case 'UPDATE_EMPLOYEE_ROLE':
                updateEmployeeRole();
                break;
            case 'VIEW_ALL_ROLES':
                viewRoles();
                break;
            case 'ADD_ROLE':
                addRole();
                break;
            case 'VIEW_ALL_DEPARTMENTS':
                viewDepartments();
                break;
            case 'ADD_DEPARTMENT':
                addDepartment();
                break;
            case 'QUIT':
                console.log('Thank you!');
                process.exit();
        }
    });
};

async function viewAllEmployees() {
  const employees = await db.query(
    `SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employee e
    LEFT JOIN role ON e.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee m ON e.manager_id = m.id`
    )
  console.table(employees);
  init();
}

async function addEmployee() {
    const roles = await db.query('SELECT id, title FROM role');
    const managers = await db.query('SELECT id, first_name, last_name FROM employee');
  
    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?"
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?"
      },
      {
        type: 'list',
        name: 'roleId',
        message: "What is the employee's role?",
        choices: roles.rows.map(role => ({ name: role.title, value: role.id }))
      },
      {
        type: 'list',
        name: 'managerId',
        message: "Who is the employee's manager?",
        choices: [
          { name: 'None', value: null },
          ...managers.rows.map(mgr => ({ name: `${mgr.first_name} ${mgr.last_name}`, value: mgr.id }))
        ]
      }
    ]);
  
    await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [firstName, lastName, roleId, managerId]);
    console.log(`Added ${firstName} ${lastName} to employees.`);
    init();
  }

async function updateEmployeeRole() {
    const employees = await db.query('SELECT id, first_name, last_name FROM employee');
    const roles = await db.query('SELECT id, title FROM role');
  
    const { employeeId, roleId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Which employee\'s role do you want to update?',
        choices: employees.rows.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Which role do you want to assign to the selected employee?',
        choices: roles.rows.map(role => ({ name: role.title, value: role.id }))
      }
    ]);
  
    await db.query('UPDATE employee SET role_id = $1 WHERE id = $2', [roleId, employeeId]);
    console.log(`Updated employee's role.`);
    init();
  }

async function viewRoles() {
    const roles = await db.query(`
      SELECT role.id, role.title, department.name AS department, role.salary
      FROM role
      JOIN department ON role.department_id = department.id
    `);
    console.table(roles.rows);
    init();
  }

async function addRole() {
    const departments = await db.query('SELECT id, name FROM department');
    const { title, salary, departmentId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the role?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary for this role?',
        validate: input => !isNaN(input) || 'Please enter a valid number'
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Which department does this role belong to?',
        choices: departments.rows.map(dept => ({ name: dept.name, value: dept.id }))
      }
    ]);
  
    await db.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [title, salary, departmentId]);
    console.log(`Added ${title} role.`)
    init();
  }

async function viewDepartments() {
    const departments = await db.query('SELECT * FROM department');
    console.table(departments.rows);
    init();
  }

async function addDepartment() {
    await inquirer.prompt(
        [{
            type: 'input',
            name: 'departmentName',
            message: 'What department would you like to add?'
        }]
    ).then((data) => {
        addDepartment(data.departmentName)
        .then(() => {
            console.log('Department successfully added!');
        })
        .then(() => init())
    })
}

init();