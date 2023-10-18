INSERT INTO department (name)
VALUES ("engineering"),
       ("finance"),
       ("legal"),
       ("sales");
INSERT INTO role (department_id, title, salary)
VALUES (4, "sales person", 100000),
       (4, "sales lead", 150000),
       (1, "lead engineer", 200000),
       (2, "account manager", 75000),
       (2, "accountant", 95000),
       (3, "legal team lead", 250000),
       (3, "lawyer", 100000);
       
INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES (2, "Mary", 'Johnson', NULL),
       (1, "John", 'Smith', 1),
       (3, "Will", 'Williamson', NULL),
       (4, "Jackie", 'Williams', NULL),
       (5, "Adam", 'King', 4),
       (6, "Jojo", 'Siwa', NULL),
       (7, "Johnny", 'Cash', 6);
