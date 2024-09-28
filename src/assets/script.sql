CREATE DATABASE recipe_management1;
USE recipe_management1;

CREATE TABLE recipes (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL,
    ingredient TEXT NOT NULL
);


CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name TEXT NOT NULL
);

ALTER TABLE recipes
ADD COLUMN category_id INT NOT NULL,
ADD CONSTRAINT fk_category
FOREIGN KEY (category_id) REFERENCES categories(id);


