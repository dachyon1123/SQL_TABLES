DROP DATABASE IF EXISTS application_db;
CREATE DATABASE application_db;

use application_db;

drop table if exists employees;
drop table if exists roles;
drop table if exists departments;

create table departments (
  id int not null,
  name varchar(30) not null,
  primary key (id)
);

create table roles (
  id int not null,
  title varchar(30) not null,
  department_id int not null,
  salary decimal(10, 2) not null,
  primary key (id),
  foreign key (department_id) references departments(id)
);

create table employees (
  id int not null,
  first_name varchar(30) not null,
  last_name varchar(30) not null,
  role_id int not null,
  manager_id int,
  primary key (id),
  foreign key (role_id) references roles(id)
);