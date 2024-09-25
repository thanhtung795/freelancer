INSERT INTO account (email, password, role, status)
VALUES
    ('tung@gmail.com', '123', 'admin', TRUE),
    ('quangvu@gmail.com', '123', 'freelancer', TRUE),
    ('quangbui@gmail.com', '123', 'freelancer', TRUE),
    ('tien@gmail.com', '123', 'client', TRUE),
    ('huy@gmail.com', '123', 'client', TRUE),
    ('lannguyen@gmail.com', '123', 'freelancer', TRUE),
    ('tuanpham@gmail.com', '456', 'client', TRUE),
    ('minhtran@gmail.com', '789', 'freelancer', TRUE);

INSERT INTO user (firstName, lastName, phoneNumber, address, accountID)
VALUES
    ('Tùng', 'Võ', '1234567890', '123 Main St, City A', 1),
    ('Quang', 'Vũ', '9876543210', '456 Oak St, City B', 2),
    ('Quang', 'Bùi', NULL, '789 Pine St, City C', 3),
    ('Tiến', 'Đinh', '5551234567', NULL, 4),
    ('Huy', 'Đinh', '5559876543', '321 Elm St, City D', 5),
    ('Lan', 'Nguyễn', '5557654321', '789 Birch St, City E', 6),
    ('Tuấn', 'Phạm', '5552345678', '456 Maple St, City F', 7),
    ('Minh', 'Trần', NULL, '321 Cedar St, City G', 8);

INSERT INTO category (categoryTitle)
VALUES
    ('Web Development'),
    ('Graphic Design'),
    ('Content Writing'),
    ('Digital Marketing'),
    ('Mobile App Development');

INSERT INTO freelancer (image, hourlyRate, categoryID, userID)
VALUES
    ('freelancer1.jpg', 20.00, 1, 2),
    ('freelancer2.jpg', 35.00, 2, 3),
    ('freelancer3.jpg', 50.00, 1, 6),
    ('freelancer4.jpg', 30.00, 5, 8);

INSERT INTO client (fromPrice, toPrice, typePrice, userID)
VALUES
    (100.00, 500.00, 'fixed', 4),
    (15.00, 50.00, 'hourlyRate', 5),
    (200.00, 1000.00, 'fixed', 7);

INSERT INTO company (companyName, phoneContact, address, location, clientID)
VALUES
    ('ABC Tech Solutions', '1234567890', '123 Elm St, City A', 'New York, USA', 1),
    ('XYZ Marketing', '0987654321', '456 Oak St, City B', 'Los Angeles, USA', 2),
    ('Global Innovations', '5551234567', '789 Pine St, City C', 'San Francisco, USA', 3);

INSERT INTO skill (skillName)
VALUES
    ('JavaScript'),
    ('Python'),
    ('Graphic Design'),
    ('Project Management'),
    ('SEO Optimization'),
    ('Data Analysis'),
    ('Mobile App Development'),
    ('Content Writing'),
    ('UI/UX Design'),
    ('Digital Marketing');

INSERT INTO freelancer_skill (freelancerID, skillID)
VALUES
    (2, 1),
    (2, 6),
    (1, 2),
    (1, 3),
    (4, 1),
    (4, 7),
    (3, 8);

INSERT INTO school (schoolName)
VALUES
    ('Harvard University'),
    ('Stanford University'),
    ('Massachusetts Institute of Technology'),
    ('California Institute of Technology'),
    ('University of Oxford'),
    ('University of Cambridge'),
    ('ETH Zurich - Swiss Federal Institute of Technology'),
    ('University of Chicago'),
    ('Imperial College London'),
    ('Columbia University');

INSERT INTO major (majorName)
VALUES
    ('Computer Science'),
    ('Business Administration'),
    ('Mechanical Engineering'),
    ('Electrical Engineering'),
    ('Civil Engineering'),
    ('Psychology'),
    ('Graphic Design'),
    ('Information Technology'),
    ('Marketing'),
    ('Data Science');

INSERT INTO degree (degreeTitle)
VALUES
    ('Bachelor of Science'),
    ('Bachelor of Arts'),
    ('Master of Science'),
    ('Master of Arts'),
    ('Doctor of Philosophy'),
    ('Associate Degree'),
    ('Bachelor of Engineering'),
    ('Master of Business Administration'),
    ('Doctor of Education'),
    ('Bachelor of Fine Arts');

INSERT INTO education (freelancerID, schoolID, majorID, degreeID, dateStart, dateEnd, description)
VALUES
    (1, 1, 1, 1, '2015-09-01', '2019-06-30', 'Bachelor of Science in Computer Science at Harvard University.'),
    (2, 2, 3, 1, '2016-09-01', '2020-06-30', 'Bachelor of Engineering in Mechanical Engineering at Stanford University.'),
    (4, 3, 2, 2, '2017-09-01', '2021-06-30', 'Bachelor of Arts in Business Administration at Massachusetts Institute of Technology.'),
    (2, 4, 4, 3, '2020-09-01', '2022-06-30', 'Master of Science in Data Science at California Institute of Technology.'),
    (3, 5, 5, 1, '2015-09-01', '2018-06-30', 'Bachelor of Science in Civil Engineering at University of Oxford.');

INSERT INTO job (title, scope, hourWork, jobOpportunity, fromPrice, toPrice, typePrice, status, clientID, categoryID)
VALUES
    ('Web Developer', 'large', 40.00, TRUE, 500.00, 1500.00, 'fixed', TRUE, 1, 1),
    ('Graphic Designer', 'medium', 20.00, FALSE, 200.00, 800.00, 'fixed', TRUE, 2, 2),
    ('SEO Specialist', 'medium', 30.00, TRUE, 100.00, 400.00, 'hourlyRate', TRUE, 3, 3),
    ('Content Writer', 'small', 25.00, FALSE, 15.00, 50.00, 'hourlyRate', TRUE, 1, 4),
    ('Mobile App Developer', 'large', 60.00, TRUE, 1000.00, 3000.00, 'fixed', TRUE, 2, 1);


INSERT INTO freelancer_job (freelancerID, jobID, isSelected, status)
VALUES
    (1, 1, TRUE, TRUE),
    (2, 1, FALSE, TRUE),
    (3, 2, TRUE, TRUE),
    (4, 4, FALSE, TRUE),
    (1, 2, FALSE, TRUE);

INSERT INTO job_skill (jobID, skillID)
VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (3, 4),
    (4, 5),
    (5, 1),
    (5, 3);
