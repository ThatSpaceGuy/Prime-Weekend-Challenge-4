-- Run these SQL commands to set-up the database
CREATE TABLE toDoList (
	id SERIAL PRIMARY KEY,
 	task_name VARCHAR(200),
 	completed BOOLEAN
 );
