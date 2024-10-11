-- Chèn dữ liệu vào bảng account
INSERT INTO account (email, password, role, status) VALUES
('admin@example.com', 'password123', 'admin', TRUE),
('freelancer1@example.com', 'password123', 'freelancer', TRUE),
('client1@example.com', 'password123', 'client', TRUE),
('freelancer2@example.com', 'password123', 'freelancer', TRUE),
('client2@example.com', 'password123', 'client', TRUE),
('admin2@example.com', 'password123', 'admin', TRUE),
('freelancer3@example.com', 'password123', 'freelancer', TRUE),
('client3@example.com', 'password123', 'client', TRUE);

-- Chèn dữ liệu vào bảng user
INSERT INTO user (first_name, last_name, phone_number, address, account_id) VALUES
('John', 'Doe', '123456789', '123 Main St', 1),  -- Admin
('Jane', 'Smith', '987654321', '456 Maple Ave', 2),  -- Freelancer
('Bob', 'Johnson', '555666777', '789 Oak St', 3),  -- Client
('Alice', 'Brown', '444555666', '321 Pine St', 4),  -- Freelancer
('Charlie', 'Davis', '333444555', '654 Cedar St', 5),  -- Client
('Eve', 'White', '222333444', '852 Willow St', 6),  -- Admin 2
('Frank', 'Green', '111222333', '963 Birch St', 7),  -- Freelancer 3
('Grace', 'Black', '888999000', '741 Spruce St', 8);  -- Client 3

select * from cli
-- Chèn dữ liệu vào bảng category
INSERT INTO category (category_title) VALUES
('Web Development'),
('Graphic Design'),
('Data Science'),
('Mobile Development'),
('SEO Optimization'),
('Content Writing');

-- Chèn dữ liệu vào bảng freelancer
INSERT INTO freelancer (image, hourly_rate, category_id, user_id) VALUES
('freelancer1.jpg', 20.50, 1, 2),  -- Freelancer 1 liên kết với user_id 2 và category_id 1 (Web Development)
('freelancer2.jpg', 30.75, 3, 4),  -- Freelancer 2 liên kết với user_id 4 và category_id 3 (Data Science)
('freelancer3.jpg', 25.00, 2, 6);  -- Freelancer 3 liên kết với user_id 6 và category_id 2 (Graphic Design)

-- Chèn dữ liệu vào bảng client
INSERT INTO client (from_price, to_price, type_price, user_id) VALUES
(500.00, 1000.00, 'fixed', 3),  -- Client 1 liên kết với user_id 3
(200.00, 500.00, 'hourly', 5),  -- Client 2 liên kết với user_id 5
(300.00, 800.00, 'fixed', 7);  -- Client 3 liên kết với user_id 7

-- Chèn dữ liệu vào bảng company
INSERT INTO company (company_name, phone_contact, address, location, client_id) VALUES
('Tech Solutions', '123456789', '456 Maple Ave', 'San Francisco', 1),  -- Company liên kết với client_id 1
('Creative Studio', '987654321', '789 Oak St', 'Los Angeles', 2),  -- Company liên kết với client_id 2
('Innovative Designs', '321654987', '159 Elm St', 'Seattle', 3);  -- Company liên kết với client_id 3

-- Chèn dữ liệu vào bảng skill
INSERT INTO skill (skill_name) VALUES
('JavaScript'),
('Python'),
('Graphic Design'),
('Data Analysis'),
('Mobile App Development'),
('SEO Optimization'),
('Content Writing');

-- Chèn dữ liệu vào bảng freelancer_skill
INSERT INTO freelancer_skill (freelancer_id, skill_id) VALUES
(1, 1),  -- Freelancer 1 có kỹ năng JavaScript
(1, 2),  -- Freelancer 1 có kỹ năng Python
(2, 4),  -- Freelancer 2 có kỹ năng Data Analysis
(2, 5),  -- Freelancer 2 có kỹ năng Mobile App Development
(3, 3),  -- Freelancer 3 có kỹ năng Graphic Design
(3, 6);  -- Freelancer 3 có kỹ năng SEO Optimization

-- Chèn dữ liệu vào bảng school
INSERT INTO school (school_name) VALUES
('Harvard University'),
('Stanford University'),
('MIT'),
('California Institute of Technology'),
('University of California'),
('University of Washington');

-- Chèn dữ liệu vào bảng major
INSERT INTO major (major_name) VALUES
('Computer Science'),
('Business Administration'),
('Graphic Design'),
('Data Science'),
('Marketing'),
('English Literature');

-- Chèn dữ liệu vào bảng degree
INSERT INTO degree (degree_title) VALUES
('Bachelor of Science'),
('Master of Business Administration'),
('PhD'),
('Bachelor of Arts'),
('Associate Degree'),
('Doctorate');

-- Chèn dữ liệu vào bảng education
INSERT INTO education (freelancer_id, school_id, major_id, degree_id, date_start, date_end, description) VALUES
(1, 1, 1, 1, '2010-09-01', '2014-06-01', 'Studied Computer Science at Harvard'),
(2, 3, 4, 3, '2012-09-01', '2016-06-01', 'Studied Data Science at MIT'),
(3, 2, 3, 1, '2014-09-01', '2018-06-01', 'Studied Graphic Design at Stanford');

INSERT INTO job (title, scope, hour_work, job_opportunity, from_price, to_price, type_price, status, date_start, date_end, created_at, client_id, category_id, description)
VALUES
('Phát triển Website', 'large', 150, TRUE, 1000.00, 5000.00, 'fixed', TRUE, '2024-01-01', '2024-02-02', NOW(), 1, 1, 'Phát triển một website hoàn chỉnh với tính năng thương mại điện tử'),
('Phát triển Ứng dụng Di động', 'medium', 200, FALSE, 1500.00, 7000.00, 'hourly', TRUE, '2024-03-03', '2024-04-04', NOW(), 2, 4, 'Tạo ứng dụng di động đa nền tảng cho Android và iOS'),
('Dự án Thiết kế Đồ họa', 'small', 50, TRUE, 200.00, 1000.00, 'fixed', TRUE, '2024-05-05', '2024-06-06', NOW(), 3, 2, 'Thiết kế logo và tài liệu quảng cáo cho thương hiệu'),
('Tối ưu SEO cho Doanh nghiệp', 'large', 100, TRUE, 300.00, 1500.00, 'hourly', TRUE, '2024-07-07', '2024-08-08', NOW(), 1, 5, 'Cải thiện thứ hạng tìm kiếm trên công cụ tìm kiếm cho website doanh nghiệp');


-- Chèn dữ liệu vào bảng freelancer_job
INSERT INTO freelancer_job (freelancer_id, job_id, is_selected, status) VALUES
(1, 1, FALSE, TRUE),  -- Freelancer 1 tham gia công việc 1
(2, 2, TRUE, TRUE),  -- Freelancer 2 tham gia công việc 2
(3, 3, FALSE, TRUE);  -- Freelancer 3 tham gia công việc 3

-- Chèn dữ liệu vào bảng job_skill
INSERT INTO job_skill (job_id, skill_id) VALUES
(1, 1),  -- Job 1 yêu cầu kỹ năng JavaScript
(1, 2),  -- Job 1 yêu cầu kỹ năng Python
(2, 5),  -- Job 2 yêu cầu kỹ năng Mobile App Development
(3, 3),  -- Job 3 yêu cầu kỹ năng Graphic Design
(4, 6);  -- Job 4 yêu cầu kỹ năng SEO Optimization
