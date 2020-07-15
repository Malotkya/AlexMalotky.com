use AlexMalotky_Com;

DROP TABLE FamilyConnections;
DROP TABLE FamilyMember;

CREATE TABLE FamilyMember (
	id INT AUTO_INCREMENT,
    name varchar(50),
    picture varchar(20),
    connection_id INT,
    constraint primary key(id)
);

CREATE TABLE FamilyConnections (
	id INT AUTO_INCREMENT,
    first_person INT,
    second_person INT,
    constraint primary key(id, first_person, second_person),
    constraint foreign key(first_person) references FamilyMember(id),
    constraint foreign key(first_person) references FamilyMember(id)
);

INSERT INTO FamilyMember(name) VALUES ('Passion Malotky');
INSERT INTO FamilyMember(name) VALUES ('Alex Malotky');

INSERT INTO FamilyConnections(first_person, second_person) VALUES (1,2);
INSERT INTO FamilyMember(name, connection_id) VALUES ('Child', 1)