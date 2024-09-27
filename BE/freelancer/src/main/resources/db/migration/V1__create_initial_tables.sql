drop database job_e_commerce_platform;

CREATE DATABASE job_e_commerce_platform;

use job_e_commerce_platform;

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
-- Tạo bảng account
CREATE TABLE account
(
    account_id INT PRIMARY KEY AUTO_INCREMENT,
    email      VARCHAR(255) NOT NULL,
    password   VARCHAR(255) NOT NULL,
    role       ENUM('admin', 'freelancer', 'client') NOT NULL,
    status     BOOLEAN NOT NULL
);

-- Tạo bảng user
CREATE TABLE user
(
    user_id      INT PRIMARY KEY AUTO_INCREMENT,
    first_name   VARCHAR(255) NOT NULL,
    last_name    VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    address      VARCHAR(255),
    account_id   INT UNIQUE,
    FOREIGN KEY (account_id) REFERENCES account (account_id)
);

-- Tạo bảng category
CREATE TABLE category
(
    category_id    INT PRIMARY KEY AUTO_INCREMENT,
    category_title VARCHAR(100) NOT NULL
);

-- Tạo bảng freelancer
CREATE TABLE freelancer
(
    freelancer_id INT PRIMARY KEY AUTO_INCREMENT,
    image         VARCHAR(255),
    hourly_rate   DECIMAL(10, 2),
    category_id   INT,
    user_id       INT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES user (user_id),
    FOREIGN KEY (category_id) REFERENCES category (category_id)
);

-- Tạo bảng client
CREATE TABLE client
(
    client_id  INT PRIMARY KEY AUTO_INCREMENT,
    from_price DECIMAL(10, 2),
    to_price   DECIMAL(10, 2),
    type_price ENUM('fixed', 'hourly_rate') NOT NULL,
    user_id    INT UNIQUE,
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);

-- Tạo bảng company
CREATE TABLE company
(
    company_id    INT PRIMARY KEY AUTO_INCREMENT,
    company_name  VARCHAR(255) NOT NULL,
    phone_contact VARCHAR(20),
    address       VARCHAR(255),
    location      VARCHAR(255),
    client_id     INT UNIQUE,
    FOREIGN KEY (client_id) REFERENCES client (client_id)
);

-- Tạo bảng skill
CREATE TABLE skill
(
    skill_id   INT PRIMARY KEY AUTO_INCREMENT,
    skill_name VARCHAR(255) NOT NULL
);

-- Tạo bảng freelancer_skill
CREATE TABLE freelancer_skill
(
    freelancer_id INT,
    skill_id      INT,
    PRIMARY KEY (freelancer_id, skill_id),
    FOREIGN KEY (freelancer_id) REFERENCES freelancer (freelancer_id),
    FOREIGN KEY (skill_id) REFERENCES skill (skill_id)
);

-- Tạo bảng school
CREATE TABLE school
(
    school_id   INT PRIMARY KEY AUTO_INCREMENT,
    school_name VARCHAR(255) NOT NULL
);

-- Tạo bảng major
CREATE TABLE major
(
    major_id   INT PRIMARY KEY AUTO_INCREMENT,
    major_name VARCHAR(255) NOT NULL
);

-- Tạo bảng degree
CREATE TABLE degree
(
    degree_id    INT PRIMARY KEY AUTO_INCREMENT,
    degree_title VARCHAR(255) NOT NULL
);

-- Tạo bảng education
CREATE TABLE education
(
    freelancer_id INT,
    school_id     INT,
    major_id      INT,
    degree_id     INT,
    date_start    DATE,
    date_end      DATE,
    description   TEXT,
    PRIMARY KEY (freelancer_id, school_id),
    FOREIGN KEY (freelancer_id) REFERENCES freelancer (freelancer_id),
    FOREIGN KEY (school_id) REFERENCES school (school_id),
    FOREIGN KEY (major_id) REFERENCES major (major_id),
    FOREIGN KEY (degree_id) REFERENCES degree (degree_id)
);

-- Tạo bảng job
CREATE TABLE job
(
    job_id          INT PRIMARY KEY AUTO_INCREMENT,
    title           VARCHAR(255) NOT NULL,
    scope           ENUM('small', 'medium', 'large'),
    hour_work       DECIMAL(10, 2),
    job_opportunity BOOLEAN,
    from_price      DECIMAL(10, 2),
    to_price        DECIMAL(10, 2),
    type_price      ENUM('fixed', 'hourly_rate'),
    status          BOOLEAN,
    client_id       INT,
    category_id     INT,
    FOREIGN KEY (client_id) REFERENCES client (client_id),
    FOREIGN KEY (category_id) REFERENCES category (category_id)
);

-- Tạo bảng freelancer_job
CREATE TABLE freelancer_job
(
    freelancer_id INT,
    job_id        INT,
    is_selected   BOOLEAN DEFAULT FALSE,
    status        BOOLEAN,
    PRIMARY KEY (freelancer_id, job_id),
    FOREIGN KEY (freelancer_id) REFERENCES freelancer (freelancer_id),
    FOREIGN KEY (job_id) REFERENCES job (job_id)
);

-- Tạo bảng job_skill
CREATE TABLE job_skill
(
    job_id   INT,
    skill_id INT,
    PRIMARY KEY (job_id, skill_id),
    FOREIGN KEY (job_id) REFERENCES job (job_id),
    FOREIGN KEY (skill_id) REFERENCES skill (skill_id)
);
