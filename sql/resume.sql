use AlexMalotky_Com;

DROP TABLE schoolHistory;
DROP TABLE jobHistory;

CREATE TABLE schoolHistory (
	id int auto_increment,
    name varchar(50),
    degree varchar(50),
    gpa decimal(3,2),
    graduated date,
    comments text,
    constraint primary key(id)
);

CREATE TABLE jobHistory (
	id int auto_increment,
    title varchar(50),
    location varchar(50),
    startDate date,
    endDate date,
    description text,
    constraint primary key(id)
);

INSERT INTO schoolHistory(name, degree, gpa, graduated, comments)
VALUES('Madison Area Technical College', 'Web Software Development', 3.68, '2019-12-01',
		'Dean\'s List 2018 & 2019');
        
INSERT INTO schoolHistory(name, degree, gpa, graduated, comments)
VALUES('Sussex Hamilton High', '', 3.3, '2010-06-01', '');

INSERT INTO jobHistory(title, location, startDate, endDate, description)
VALUES("Sales Associate", "Wal-Mart", '2016-09-1', '2018-07-1', 
"- Employed consultative selling skills and active listening techniques to better assist customers in having a positive retail experience.
- Responsibly handled currency and monetary transactions without discrepancies.
- Enjoyed using my creative talents to build features and displays as needed both outside and inside.
- Trusted to oversee the sporting goods department which engaged in the sale of firearms and ammunition which required background checks to be conducted." );

INSERT INTO jobHistory(title, location, startDate, endDate, description)
VALUES("Security Officer at DATCP", "Per Mar Security", '2017-05-1', null, 
"- Responsible for monitoring and controlling tenant and visitor access to a state government facility.
- Process visitor registration.
- Coordinate with and assist law enforcement and medical personnel to respond to emergency situations.
- Received Officer of the Month award March 2019." );
