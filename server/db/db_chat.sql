CREATE TABLE users(
    userID INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL unique,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL
);