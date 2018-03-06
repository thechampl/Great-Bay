CREATE DATABASE greatbay;
USE greatbay;
CREATE TABLE greattable(
    id INT NOT NULL AUTO_INCREMENT,
    name varchar(255),
    price decimal(18,2),
    PRIMARY KEY(id)
);
-- SELECT * FROM greattable;