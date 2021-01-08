CREATE TABLE todos (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(200) NOT NULL,
	"dueDate" DATE,
	"completed" BOOLEAN DEFAULT false
);

INSERT INTO todos ("task", "dueDate", "completed")
VALUES ('Eat dinner', '2021-01-08', false),
('Set fantasy NBA roster', '2021-01-09', false),
('Complete weekend project', '2021-01-10', false);