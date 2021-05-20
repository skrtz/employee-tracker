USE company_db;

INSERT INTO departments (name)
VALUES ("Sales"), ("Engineer"), ("Finance"), ("Lawyer");

INSERT INTO roles (title, salary, dept_id)
VALUES ("Sales Lead", 80000, 1), ("Sales Person", 50000, 1), ("Lead Engineer", 150000, 2), ("Software Engineer", 100000, 2), ("Acount Manager", 100000, 3), ("Accountant", 75000, 3), ("Legal", 150000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Paulie", "Walnuts", 1), ("Christopher", "Moltisanti", 2, 1), ("Tony", "Saprono", 3), ("Silvio", "Dante", 4, 3), ("Hesh", "Rabkin", 5), ("Furio", "Giunta", 6, 5), ("Neil", "Mink", 7);
