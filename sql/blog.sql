use AlexMalotky_Com;

DROP TABLE blog;

CREATE TABLE blog (
	id INT AUTO_INCREMENT,
    user_id INT,
    title VARCHAR(50),
    tags JSON,
    message TEXT,
    stamp TIMESTAMP DEFAULT NOW(),
    CONSTRAINT PRIMARY KEY(id),
    CONSTRAINT FOREIGN KEY(user_id) REFERENCES user(id)
);

INSERT INTO blog(user_id, title, tags, message)
VALUES(1, "Test Entry", "[]", "This is an entry entered from SQL");