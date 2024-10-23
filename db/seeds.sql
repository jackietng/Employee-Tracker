INSERT INTO department (id, name)
VALUES (001, 'Marketing'),
       (002, 'IT'),
       (003, 'Finance'),
       (004, 'Human Resources');

INSERT INTO role (id, title, salary, department_id)
VALUES (005, 'Marketing Coordinator', 45000, (SELECT id FROM department WHERE id = '001')), 
       (006, 'Marketing Manager', 65000, (SELECT id FROM department WHERE id = '001')), 
       (007, 'Content Strategist', 55000, (SELECT id FROM department WHERE id = '001')), 
       (008, 'Digital Marketing Director', 85000, (SELECT id FROM department WHERE id = '001')), 
       (009, 'Help Desk Technician', 50000, (SELECT id FROM department WHERE id = '002')), 
       (010, 'Systems Administrator', 70000, (SELECT id FROM department WHERE id = '002')), 
       (011, 'Software Developer', 80000, (SELECT id FROM department WHERE id = '002')), 
       (012, 'IT Manager', 100000, (SELECT id FROM department WHERE id = '002')), 
       (013, 'Financial Analyst', 55000, (SELECT id FROM department WHERE id = '003')),
       (014, 'Accountant', 60000, (SELECT id FROM department WHERE id = '003')),
       (015, 'Finance Manager', 80000, (SELECT id FROM department WHERE id = '003')), 
       (016, 'Chief Financial Officer', 150000, (SELECT id FROM department WHERE id = '003')),
       (017, 'HR Assistant', 40000, (SELECT id FROM department WHERE id = '004')),
       (018, 'HR Manager', 70000, (SELECT id FROM department WHERE id = '004')),
       (019, 'Talent Acquisition Specialist', 60000, (SELECT id FROM department WHERE id = '004')), 
       (020, 'Director of HR', 100000, (SELECT id FROM department WHERE id = '004'));  

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (021, 'Emma', 'Jonson', (SELECT id FROM role WHERE title = 'Marketing Coordinator'), NULL),
       (022, 'Liam', 'Smith', (SELECT id FROM role WHERE title = 'Marketing Manager'), (SELECT id FROM employee WHERE first_name = 'Emma' AND last_name = 'Jonson')), 
       (023, 'Olivia', 'Brown', (SELECT id FROM role WHERE title = 'Content Strategist'), NULL), 
       (024, 'Noah', 'Davis', (SELECT id FROM role WHERE title = 'Digital Marketing Director'), (SELECT id FROM employee WHERE first_name = 'Olivia' AND last_name = 'Brown')), 
       (025, 'Ava', 'Wilson', (SELECT id FROM role WHERE title = 'Help Desk Technician'), NULL), 
       (026, 'Elijah', 'Miller', (SELECT id FROM role WHERE title = 'Systems Administrator'), NULL), 
       (027, 'Sophia', 'Taylor', (SELECT id FROM role WHERE title = 'Software Developer'), NULL), 
       (028, 'James', 'Anderson', (SELECT id FROM role WHERE title = 'IT Manager'), (SELECT id FROM employee WHERE first_name = 'Sophia' AND last_name = 'Taylor')), 
       (029, 'Isabella', 'Thomas', (SELECT id FROM role WHERE title = 'Financial Analyst'), NULL), 
       (030, 'Lucas', 'Martinez', (SELECT id FROM role WHERE title = 'Accountant'), NULL), 
       (031, 'Amina', 'Khan', (SELECT id FROM role WHERE title = 'Finance Manager'), (SELECT id FROM employee WHERE first_name = 'Lucas' AND last_name = 'Martinez')), 
       (032, 'Javier', 'Rodriguez', (SELECT id FROM role WHERE title = 'Chief Financial Officer'), (SELECT id FROM employee WHERE first_name = 'Amina' AND last_name = 'Khan')),
       (033, 'Fatima', 'Al-Mansoori', (SELECT id FROM role WHERE title = 'HR Assistant'), NULL), 
       (034, 'Raj', 'Patel', (SELECT id FROM role WHERE title = 'HR Manager'), (SELECT id FROM employee WHERE first_name = 'Fatima' AND last_name = 'Al-Mansoori')), 
       (035, 'Keiko', 'Tanaka', (SELECT id FROM role WHERE title = 'Talent Acquisition Specialist'), NULL), 
       (036, 'Chao', 'Liu', (SELECT id FROM role WHERE title = 'Director of HR'), (SELECT id FROM employee WHERE first_name = 'Raj' AND last_name = 'Patel'));