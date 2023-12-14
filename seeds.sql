insert into departments (id, name)
values (1, "Finance"),
       (2, "Sales"),
       (3, "Engineering"),
       (4, "Legal");
       

insert into roles (id, title, department_id, salary)
values (1, "Sales Lead", 2, 100000),
       (2, "Salesperson", 2, 75000),
       (3, "Lead Engineer", 3, 120000),
       (4, "Software Engineer", 3, 102000),
       (5, "Account Manager", 1, 65000),
       (6, "Accountant", 1, 80000),
       (7, "Legal Team Lead", 4, 140000),
       (8, "Lawyer", 4, 180000);


insert into employees (id, first_name, last_name, role_id, manager_id)
values
(1, "Dylan", "Polito", 1, null),
(2, "Tyler", "Polito", 2, 1),
(3, "John", "Doe", 3, null),
(4, "Jeffery", "Collins", 4, 3),
(5, "Chris", "Pratt", 5, null),
(6, "Jack", "Price", 6, 5),
(7, "Ashley", "Jenkins", 7, null),
(8, "Christina", "Jenkins", 8, 7);