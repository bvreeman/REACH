DROP DATABASE IF EXISTS contacts_db;

CREATE DATABASE contacts_db;

USE contacts_db;

CREATE TABLE contacts (
   id int NOT NULL AUTO_INCREMENT,
   contact_name varchar(255) DEFAULT '',
   phone_number varchar(255) NOT NULL,
   email_address varchar(255) DEFAULT '',
   outgoing_message varchar(255) NOT NULL,
   scheduled_send varchar(255) NOT NULL,
   sent boolean NOT NULL DEFAULT false,
   PRIMARY KEY (id)
);

INSERT INTO contacts (contact_name, phone_number, email_address, outgoing_message, scheduled_send, sent) VALUES ('', '+15072591109', '', 'Hi. Eat at Mannies Manacottis', '2018-06-06 09:25 PM', false);
INSERT INTO contacts (contact_name, phone_number, email_address, outgoing_message, scheduled_send, sent) VALUES ('', '+12182134462', '', 'Hi. Eat at Mannies Manacottis', '2018-06-06 09:25 PM', false);
INSERT INTO contacts (contact_name, phone_number, email_address, outgoing_message, scheduled_send, sent) VALUES ('', '+19728902221', '', 'Hi. Eat at Mannies Manacottis', '2018-06-06 09:27 PM', false);
INSERT INTO contacts (contact_name, phone_number, email_address, outgoing_message, scheduled_send, sent) VALUES ('', '+14257616386', '', 'Hi. Eat at Mannies Manacottis', '2018-06-06 09:27 PM', false);