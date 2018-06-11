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

INSERT INTO contacts (contact_name, phone_number, email_address, outgoing_message, scheduled_send, sent) VALUES ('', '+15072591109', '', 'Brandon! You need to come to Mannys Manacottis. It is awesome!', '2018-06-07 06:42 PM', false);
INSERT INTO contacts (contact_name, phone_number, email_address, outgoing_message, scheduled_send, sent) VALUES ('', '+12182134462', '', 'Hey Thom. Hungry? Come eat at Mannys Manacottis.', '2018-06-07 06:42 PM', false);
INSERT INTO contacts (contact_name, phone_number, email_address, outgoing_message, scheduled_send, sent) VALUES ('', '+19728902221', '', 'Hey Majid. Are you hungry? Mannys Manacottis will be in Minneapolis tomorrow night. Hope to see you for supper!', '2018-06-07 06:44 PM', false);
INSERT INTO contacts (contact_name, phone_number, email_address, outgoing_message, scheduled_send, sent) VALUES ('', '+14257616386', '', 'Hi Saundra. This is your boss. We need you to come in immediately. There are puppies everywhere....EVERYWHERE!!!', '2018-06-07 06:44 PM', false);
