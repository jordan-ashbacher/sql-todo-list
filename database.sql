CREATE TABLE todos (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(200) NOT NULL,
	"dueDate" DATE,
	"completed" BOOLEAN DEFAULT false
);