-- Chèn dữ liệu vào bảng account
INSERT INTO account (email, password, role, status) VALUES
('admin@example.com', 'password123', 'admin', TRUE),
('freelancer1@example.com', 'password123', 'freelancer', TRUE),
('client1@example.com', 'password123', 'client', TRUE);

-- Chèn dữ liệu vào bảng user
INSERT INTO user (first_name, last_name, phone_number, address, account_id) VALUES
('John', 'Doe', '123456789', '123 Main St', 1),  -- Admin
('Jane', 'Smith', '987654321', '456 Maple Ave', 2),  -- Freelancer
('Bob', 'Johnson', '555666777', '789 Oak St', 3);  -- Client

-- Chèn dữ liệu vào bảng category
INSERT INTO category (category_title) VALUES
('Web Development'),
('Graphic Design'),
('Data Science');

-- Chèn dữ liệu vào bảng freelancer
INSERT INTO freelancer (image, hourly_rate, category_id, user_id) VALUES
('freelancer1.jpg', 20.50, 1, 2);  -- Freelancer liên kết với user_id 2 và category_id 1 (Web Development)

-- Chèn dữ liệu vào bảng client
INSERT INTO client (from_price, to_price, type_price, user_id) VALUES
(500.00, 1000.00, 'fixed', 3);  -- Client liên kết với user_id 3

-- Chèn dữ liệu vào bảng company
INSERT INTO company (company_name, phone_contact, address, location, client_id) VALUES
('Tech Solutions', '123456789', '456 Maple Ave', 'San Francisco', 1);  -- Company liên kết với client_id 1

-- Chèn dữ liệu vào bảng skill
INSERT INTO skill (skill_name) VALUES
('JavaScript'),
('Python'),
('Graphic Design'),
('Data Analysis');

-- Chèn dữ liệu vào bảng freelancer_skill
INSERT INTO freelancer_skill (freelancer_id, skill_id) VALUES
(1, 1),  -- Freelancer 1 có kỹ năng JavaScript
(1, 2);  -- Freelancer 1 có kỹ năng Python

-- Chèn dữ liệu vào bảng school
INSERT INTO school (school_name) VALUES
('Harvard University'),
('Stanford University'),
('MIT');

-- Chèn dữ liệu vào bảng major
INSERT INTO major (major_name) VALUES
('Computer Science'),
('Business Administration'),
('Graphic Design');

-- Chèn dữ liệu vào bảng degree
INSERT INTO degree (degree_title) VALUES
('Bachelor of Science'),
('Master of Business Administration'),
('PhD');

-- Chèn dữ liệu vào bảng education
INSERT INTO education (freelancer_id, school_id, major_id, degree_id, date_start, date_end, description) VALUES
(1, 1, 1, 1, '2010-09-01', '2014-06-01', 'Studied Computer Science at Harvard');

-- Chèn dữ liệu vào bảng job
INSERT INTO job (title, scope, hour_work, job_opportunity, from_price, to_price, type_price, status, client_id, category_id) VALUES
('Website Development', 'large', 150, TRUE, 1000.00, 5000.00, 'fixed', TRUE, 1, 1);

-- Chèn dữ liệu vào bảng freelancer_job
INSERT INTO freelancer_job (freelancer_id, job_id, is_selected, status) VALUES
(1, 1, FALSE, TRUE);  -- Freelancer 1 đang tham gia vào công việc 1

-- Chèn dữ liệu vào bảng job_skill
INSERT INTO job_skill (job_id, skill_id) VALUES
(1, 1),  -- Job 1 yêu cầu kỹ năng JavaScript
(1, 2);  -- Job 1 yêu cầu kỹ năng Pythonselect 
