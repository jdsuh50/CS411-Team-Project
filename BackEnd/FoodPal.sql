CREATE DATABASE IF NOT EXISTS FoodPal;
USE FoodPal;

CREATE TABLE Users(
 user_id INTEGER AUTO_INCREMENT,
 first_name VARCHAR(100),
 last_name VARCHAR(100),
 email VARCHAR(100),
 dateOfBirth DATE,
 hometown VARCHAR(100),
 gender VARCHAR(100),
 password VARCHAR(100) NOT NULL,
 PRIMARY KEY (user_id)
 );
 
CREATE TABLE Preferences(
    preference_id INTEGER AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    diet VARCHAR(100),
    PRIMARY KEY (preference_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
);

CREATE TABLE Intolerances(
    intolerance_id INTEGER AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    intolerance VARCHAR(100),
    PRIMARY KEY (intolerance_id),
    FOREIGN KEY (user_id) REFERENCES Users (user_id)
);
