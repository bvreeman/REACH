DROP DATABASE IF EXISTS contacts_db;

CREATE DATABASE contacts_db;

USE contacts_db;

CREATE TABLE contacts
(
id int NOT NULL AUTO_INCREMENT,
contact_name varchar(255) NOT NULL,
phone_number varchar(20) NOT NULL,
email varchar(255),
PRIMARY KEY (id)
);