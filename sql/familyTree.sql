use AlexMalotky_Com;

DROP TABLE familyMember;

CREATE TABLE familyMember (
	id INT AUTO_INCREMENT,
    name varchar(50),
    picture varchar(20),
    parent_id INT,
    constraint primary key(id)
    /*constraint foreign key(parent_id) references familyMember(id)*/
);

INSERT INTO familyMember(name) VALUES ('Alex & Passion Malotky');
INSERT INTO familyMember(name, parent_id) VALUES ('Child 1', 1);
INSERT INTO familyMember(name, parent_id) VALUES ('Child 2', 1);
INSERT INTO familyMember(name, parent_id) VALUES ('Grandchild 1', 2);
INSERT INTO familyMember(name, parent_id) VALUES ('Grandchild 2', 2);
INSERT INTO familyMember(name, parent_id) VALUES ('Grandchild 3', 3);
INSERT INTO familyMember(name, parent_id) VALUES ('Grandchild 4', 3);

SELECT * FROM familyMember;