-- 1. Chèn dữ liệu vào bảng account
INSERT INTO account (email, password, role, status) VALUES
('admin@example.com', 'password123', 'admin', TRUE),
('freelancer@example.com', 'freelancerPass', 'freelancer', TRUE),
('client@example.com', 'clientPass', 'client', TRUE);

-- 2. Chèn dữ liệu vào bảng user
INSERT INTO user (first_name, last_name, phone_number, address, account_id) VALUES
('John', 'Doe', '123456789', '123 Main St', 1),
('Alice', 'Smith', '987654321', '456 Elm St', 2),
('Bob', 'Johnson', '456789123', '789 Pine St', 3);

-- 3. Chèn dữ liệu vào bảng category
INSERT INTO category (category_title) VALUES
('Web Development'),
('Graphic Design'),
('SEO'),
('Content Writing'),
('Mobile Development');

-- 4. Chèn dữ liệu vào bảng freelancer
INSERT INTO freelancer (image, hourly_rate, category_id, user_id) VALUES
('image1.jpg', 30.00, 1, 1), -- user_id = 1
('image2.jpg', 25.00, 2, 2), -- user_id = 2
('image3.jpg', 35.00, 3, 3); -- user_id = 3

-- 5. Chèn dữ liệu vào bảng client
INSERT INTO client (from_price, to_price, type_price, user_id) VALUES
(500.00, 1500.00, 'fixed', 1), -- user_id = 1
(200.00, 800.00, 'hourly_rate', 2); -- user_id = 2

-- 6. Chèn dữ liệu vào bảng company
INSERT INTO company (company_name, phone_contact, address, location, client_id) VALUES
('Tech Solutions', '111222333', '123 Tech Ave', 'City A', 1), -- client_id = 1
('Creative Agency', '444555666', '456 Creative Blvd', 'City B', 2); -- client_id = 2

-- 7. Chèn dữ liệu vào bảng skill
INSERT INTO skill (skill_name) VALUES
('Java'),
('JavaScript'),
('HTML/CSS'),
('SEO Optimization'),
('Content Creation');

-- 8. Chèn dữ liệu vào bảng freelancer_skill
INSERT INTO freelancer_skill (freelancer_id, skill_id) VALUES
(1, 1), -- freelancer_id = 1, skill_id = 1
(1, 3), -- freelancer_id = 1, skill_id = 3
(2, 2), -- freelancer_id = 2, skill_id = 2
(3, 4); -- freelancer_id = 3, skill_id = 4

-- 9. Chèn dữ liệu vào bảng school
INSERT INTO school (school_name) VALUES
('University A'),
('University B'),
('University C');

-- 10. Chèn dữ liệu vào bảng major
INSERT INTO major (major_name) VALUES
('Computer Science'),
('Graphic Design'),
('Marketing');

-- 11. Chèn dữ liệu vào bảng degree
INSERT INTO degree (degree_title) VALUES
('Bachelor'),
('Master'),
('PhD');

-- 12. Chèn dữ liệu vào bảng education
INSERT INTO education (freelancer_id, school_id, major_id, degree_id, date_start, date_end, description) VALUES
(1, 1, 1, 1, '2015-01-01', '2019-01-01', 'Bachelor in Computer Science'),
(2, 2, 2, 2, '2016-01-01', '2020-01-01', 'Master in Graphic Design'),
(3, 3, 3, 3, '2017-01-01', '2021-01-01', 'PhD in Marketing');

-- 13. Chèn dữ liệu vào bảng job
INSERT INTO job (title, scope, hour_work, job_opportunity, from_price, to_price, type_price, status, client_id, category_id) VALUES
('Web Developer', 'large', 40.00, TRUE, 500.00, 1500.00, 'fixed', TRUE, 1, 1),
('Graphic Designer', 'medium', 20.00, FALSE, 200.00, 800.00, 'fixed', TRUE, 2, 2),
('SEO Specialist', 'medium', 30.00, TRUE, 100.00, 400.00, 'hourly_rate', TRUE, 1, 3),
('Content Writer', 'small', 25.00, FALSE, 15.00, 50.00, 'hourly_rate', TRUE, 2, 2),
('Mobile App Developer', 'large', 60.00, TRUE, 1000.00, 3000.00, 'fixed', TRUE, 2, 1);

-- 14. Chèn dữ liệu vào bảng freelancer_job
INSERT INTO freelancer_job (freelancer_id, job_id, is_selected, status) VALUES
(1, 1, TRUE, TRUE),
(2, 2, FALSE, TRUE),
(3, 3, TRUE, TRUE);

-- 15. Chèn dữ liệu vào bảng job_skill
INSERT INTO job_skill (job_id, skill_id) VALUES
(1, 1), -- job_id = 1, skill_id = 1
(2, 2), -- job_id = 2, skill_id = 2
(3, 4), -- job_id = 3, skill_id = 4
(4, 5); -- job_id = 4, skill_id = 5
