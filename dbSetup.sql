-- Run these SQL commands to set-up the database
CREATE TABLE toDoList (
	id SERIAL PRIMARY KEY,
 	taskName VARCHAR(100),
 	completed BOOLEAN,
 	urgent BOOLEAN,
 	created TIMESTAMP DEFAULT current_timestamp
 );
