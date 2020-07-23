use AlexMalotky_Com;

DROP TABLE user_role;
DROP TABLE role;
DROP TABLE user;

CREATE TABLE user (
	id int auto_increment,
    email varchar(20),
    password varchar(60),
    firstName varchar(20),
    lastName varchar(20),
    constraint primary key(id)
);

CREATE TABLE role (
	id int auto_increment,
    type varchar(15),
    constraint primary key(id)
);

CREATE TABLE user_role (
	user_id int,
    role_id int,
    constraint primary key(user_id, role_id),
    constraint foreign key(user_id) references user(id),
    constraint foreign key(role_id) references role(id)
);

INSERT INTO role(type) VALUES('Admin');
INSERT INTO role(type) VALUES('Blogger');
INSERT INTO role(type) VALUES('Family');
INSERT INTO role(type) VALUES('Family-Admin');

INSERT INTO user(email, password)
VALUES('root', '$2a$10$HylEyU5lpYe.JhG6r5oSS.roQWexP50t0BcReTbih.jQNvoAaKvYK');

INSERT INTO user(email, password)
VALUES('test', '$2a$10$HylEyU5lpYe.JhG6r5oSS.roQWexP50t0BcReTbih.jQNvoAaKvYK');

INSERT INTO user_role(user_id, role_id)
VALUES(1,1);

INSERT INTO user_role(user_id, role_id)
VALUES(1,2);

INSERT INTO user_role(user_id, role_id)
VALUES(1,3);

INSERT INTO user_role(user_id, role_id)
VALUES(1,4);

INSERT INTO user_role(user_id, role_id)
VALUES(2,2);

INSERT INTO user_role(user_id, role_id)
VALUES(2,3);

Select * from user;