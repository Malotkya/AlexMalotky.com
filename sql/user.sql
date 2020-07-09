use AlexMalotky_Com;

DROP TABLE user_role;
DROP TABLE role;
DROP TABLE user;

CREATE TABLE user (
	id int auto_increment,
    email varchar(20),
    password char(60),
    constraint primary key(id)
);

CREATE TABLE role (
	id int auto_increment,
    type varchar(10),
    constraint primary key(id)
);

CREATE TABLE user_role (
	user_id int,
    role_id int,
    constraint primary key(user_id, role_id),
    constraint foreign key(user_id) references user(id),
    constraint foreign key(role_id) references role(id)
);

INSERT INTO role(type)
VALUES('Admin');

INSERT INTO role(type)
VALUES('Blogger');

INSERT INTO user(email, password)
VALUES('root', '$2a$10$HylEyU5lpYe.JhG6r5oSS.roQWexP50t0BcReTbih.jQNvoAaKvYK');

INSERT INTO user(email, password)
VALUES('ajmalotky', '$2a$10$HylEyU5lpYe.JhG6r5oSS.roQWexP50t0BcReTbih.jQNvoAaKvYK');

INSERT INTO user_role(user_id, role_id)
VALUES(1,1);

INSERT INTO user_role(user_id, role_id)
VALUES(1,2);

INSERT INTO user_role(user_id, role_id)
VALUES(2,2);
