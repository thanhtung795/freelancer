DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS freelancer;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS client;
DROP TABLE IF EXISTS company;
DROP TABLE IF EXISTS skill;
DROP TABLE IF EXISTS freelancer_Skill;
DROP TABLE IF EXISTS school;
DROP TABLE IF EXISTS major;
DROP TABLE IF EXISTS degree;
DROP TABLE IF EXISTS education;
DROP TABLE IF EXISTS job;
DROP TABLE IF EXISTS freelancer_job;
DROP TABLE IF EXISTS job_skill;

CREATE TABLE account
(
    accountID INT PRIMARY KEY AUTO_INCREMENT,
    email     VARCHAR(255) NOT NULL,
    password  VARCHAR(255) NOT NULL,
    role      ENUM('admin', 'freelancer', 'client') NOT NULL,
    status    BOOLEAN      NOT NULL
);

CREATE TABLE user
(
    userID      INT PRIMARY KEY AUTO_INCREMENT,
    firstName   VARCHAR(255) NOT NULL,
    lastName    VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(20),
    address     VARCHAR(255),
    accountID   INT UNIQUE,
    FOREIGN KEY (accountID) REFERENCES account (accountID)
);

CREATE TABLE category
(
    categoryID    INT PRIMARY KEY AUTO_INCREMENT,
    categoryTitle VARCHAR(100) NOT NULL
);

CREATE TABLE freelancer
(
    freelancerID INT PRIMARY KEY AUTO_INCREMENT,
    image        VARCHAR(255),
    hourlyRate   DECIMAL(10, 2),
    categoryID   INT,
    userID       INT UNIQUE,
    FOREIGN KEY (userID) REFERENCES user (userID),
    FOREIGN KEY (categoryID) REFERENCES category (categoryID)
);

CREATE TABLE client
(
    clientID  INT PRIMARY KEY AUTO_INCREMENT,
    fromPrice DECIMAL(10, 2),
    toPrice   DECIMAL(10, 2),
    typePrice ENUM('fixed', 'hourlyRate') NOT NULL,
    userID    INT UNIQUE,
    FOREIGN KEY (userID) REFERENCES user (userID)
);

CREATE TABLE company
(
    companyID    INT PRIMARY KEY AUTO_INCREMENT,
    companyName  VARCHAR(255) NOT NULL,
    phoneContact VARCHAR(20),
    address      VARCHAR(255),
    location     VARCHAR(255),
    clientID     INT UNIQUE,
    FOREIGN KEY (clientID) REFERENCES client (clientID)
);

CREATE TABLE skill
(
    skillID   INT PRIMARY KEY AUTO_INCREMENT,
    skillName VARCHAR(255) NOT NULL
);

CREATE TABLE freelancer_skill
(
    freelancerID INT,
    skillID      INT,
    PRIMARY KEY (freelancerID, skillID),
    FOREIGN KEY (freelancerID) REFERENCES freelancer (freelancerID),
    FOREIGN KEY (skillID) REFERENCES Skill (skillID)
);


CREATE TABLE school
(
    schoolID   INT PRIMARY KEY AUTO_INCREMENT,
    schoolName VARCHAR(255) NOT NULL
);

CREATE TABLE major
(
    majorID   INT PRIMARY KEY AUTO_INCREMENT,
    majorName VARCHAR(255) NOT NULL
);

CREATE TABLE degree
(
    degreeID    INT PRIMARY KEY AUTO_INCREMENT,
    degreeTitle VARCHAR(255) NOT NULL
);

CREATE TABLE education
(
    freelancerID INT,
    schoolID     INT,
    majorID      INT,
    degreeID     INT,
    dateStart    DATE,
    dateEnd      DATE,
    description  TEXT,
    PRIMARY KEY (freelancerID, schoolID),
    FOREIGN KEY (freelancerID) REFERENCES Freelancer (freelancerID),
    FOREIGN KEY (schoolID) REFERENCES School (schoolID),
    FOREIGN KEY (majorID) REFERENCES Major (majorID),
    FOREIGN KEY (degreeID) REFERENCES Degree (degreeID)
);

CREATE TABLE job
(
    jobID          INT PRIMARY KEY AUTO_INCREMENT,
    title          VARCHAR(255) NOT NULL,
    scope          TEXT,
    hourWork       INT,
    jobOpportunity VARCHAR(100),
    fromPrice      DECIMAL(10, 2),
    toPrice        DECIMAL(10, 2),
    typePayment    VARCHAR(50),
    status         VARCHAR(50),
    clientID       INT,
    categoryID     INT,
    FOREIGN KEY (clientID) REFERENCES Client (clientID),
    FOREIGN KEY (categoryID) REFERENCES Category (categoryID)
);

CREATE TABLE freelancer_job
(
    freelancerID INT,
    jobID        INT,
    isSelected   BOOLEAN DEFAULT FALSE,
    status       VARCHAR(50),
    PRIMARY KEY (freelancerID, jobID),
    FOREIGN KEY (freelancerID) REFERENCES Freelancer (freelancerID),
    FOREIGN KEY (jobID) REFERENCES Job (jobID)
);

CREATE TABLE job_skill
(
    jobID   INT,
    skillID INT,
    PRIMARY KEY (jobID, skillID),
    FOREIGN KEY (jobID) REFERENCES job (jobID),
    FOREIGN KEY (skillID) REFERENCES skill (skillID)
);
