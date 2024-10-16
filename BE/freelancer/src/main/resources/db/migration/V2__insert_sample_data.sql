use
job_e_commerce_platform;

INSERT INTO account (email, password, role, status)
VALUES ('tungvtps27852@fpt.edu.vn', '$2a$10$Uhty2BY.RLblSrKhV7f9a.xCstyCVYihM/Ce9.cdpxR6pCd5ZqsSi', 'admin', b'1'),
       ('quangvdps36680@fpt.edu.vn', '$2a$10$Uhty2BY.RLblSrKhV7f9a.xCstyCVYihM/Ce9.cdpxR6pCd5ZqsSi', 'freelancer', b'0'),
       ('quangbmps28437@fpt.edu.vn', '$2a$10$Uhty2BY.RLblSrKhV7f9a.xCstyCVYihM/Ce9.cdpxR6pCd5ZqsSi', 'freelancer', b'1'),
       ('huydqpc07859@fpt.edu.vn', '$2a$10$Uhty2BY.RLblSrKhV7f9a.xCstyCVYihM/Ce9.cdpxR6pCd5ZqsSi', 'client', b'1'),
       ('tiendqpc07858@fpt.edu.vn', '$2a$10$Uhty2BY.RLblSrKhV7f9a.xCstyCVYihM/Ce9.cdpxR6pCd5ZqsSi', 'freelancer', b'1');

INSERT INTO user (address, created_at, first_name, last_name, phone_number, account_id)
VALUES ('123 Main St, Hanoi', '2024-10-14 10:30:45.123456', 'Tùng', 'Võ', '0987654321', 1),
       ('456 High St, Danang', '2024-10-14 11:00:30.654321', 'Quang', 'Vũ', '0981234567', 2),
       ('789 Low St, Ho Chi Minh City', '2024-10-14 12:15:20.987654', 'Quang', 'Bùi', '0976543210', 3),
       ('101 Center St, Hue', '2024-10-14 13:05:55.112233', 'Huy', 'Đinh', '0912345678', 4),
       ('102 North St, Nha Trang', '2024-10-14 14:45:10.556677', 'Tiến', 'Đinh', '0908765432', 5);

INSERT INTO category (category_title)
VALUES ('Công nghệ thông tin'),
       ('Marketing'),
       ('Thiết kế & Sáng tạo'),
       ('Viết lách & Dịch thuật'),
       ('Bán hàng & Chăm sóc khách hàng'),
       ('Tài chính & Kế toán'),
       ('Kỹ thuật & Kiến trúc'),
       ('Giáo dục & Đào tạo'),
       ('Y tế & Sức khỏe'),
       ('Dịch vụ pháp lý');

INSERT INTO skill (skill_name)
VALUES ('Lập trình web'),
       ('Quản lý dự án'),
       ('Thiết kế đồ họa'),
       ('SEO & Marketing kỹ thuật số'),
       ('Viết nội dung'),
       ('Dịch thuật'),
       ('Hỗ trợ khách hàng'),
       ('Phân tích dữ liệu'),
       ('Kế toán & Kiểm toán'),
       ('Thiết kế kiến trúc'),
       ('Phát triển ứng dụng di động'),
       ('Phát triển phần mềm'),
       ('Quản trị hệ thống'),
       ('Bảo mật thông tin'),
       ('Phân tích dữ liệu'),
       ('Quản trị cơ sở dữ liệu'),
       ('Lập trình Python'),
       ('Lập trình Java'),
       ('Lập trình C++'),
       ('Lập trình PHP'),
       ('Lập trình JavaScript'),
       ('DevOps'),
       ('Machine Learning'),
       ('Trí tuệ nhân tạo (AI)'),
       ('Blockchain'),
       ('Phát triển game'),
       ('Điện toán đám mây (Cloud Computing)'),
       ('Kiểm thử phần mềm (QA/QC)'),
       ('Thiết kế đồ họa'),
       ('Thiết kế UX/UI'),
       ('Thiết kế sản phẩm'),
       ('Dựng phim & biên tập video'),
       ('SEO & Marketing kỹ thuật số'),
       ('Quảng cáo trên mạng xã hội'),
       ('Quản lý thương hiệu'),
       ('Quản lý dự án'),
       ('Viết nội dung'),
       ('Viết blog'),
       ('Dịch thuật'),
       ('Viết kịch bản'),
       ('Kế toán'),
       ('Kiểm toán'),
       ('Phân tích tài chính'),
       ('Hỗ trợ khách hàng'),
       ('Tư vấn bán hàng'),
       ('Quản lý quan hệ khách hàng (CRM)'),
       ('Thiết kế kiến trúc'),
       ('Chăm sóc sức khỏe'),
       ('Kỹ thuật xây dựng');

INSERT INTO school (school_name)
VALUES ('Trường Đại học Bách Khoa Hà Nội'),
       ('Trường Đại học Công nghệ Thông tin - Đại học Quốc gia TP.HCM'),
       ('Trường Đại học Khoa học Tự nhiên - Đại học Quốc gia Hà Nội'),
       ('Trường Đại học Kinh tế Quốc dân'),
       ('Trường Đại học Ngoại thương'),
       ('Trường Đại học FPT'),
       ('Trường Đại học Sư phạm Hà Nội'),
       ('Trường Đại học Giao thông Vận tải'),
       ('Trường Đại học Bách Khoa TP.HCM'),
       ('Trường Đại học Khoa học Xã hội và Nhân văn - Đại học Quốc gia Hà Nội'),
       ('Trường Đại học Thương mại'),
       ('Trường Đại học Luật Hà Nội'),
       ('Trường Đại học Tôn Đức Thắng'),
       ('Trường Đại học Công nghiệp Hà Nội'),
       ('Trường Đại học Xây dựng Hà Nội'),
       ('Trường Cao đẳng Công nghệ Thông tin Đà Nẵng'),
       ('Trường Cao đẳng Kinh tế Đối ngoại TP.HCM'),
       ('Trường Cao đẳng Sư phạm Trung ương'),
       ('Trường Đại học Y Hà Nội'),
       ('Trường Đại học Y Dược TP.HCM');

INSERT INTO major (major_name)
VALUES ('Khoa học máy tính'),
       ('Kỹ thuật phần mềm'),
       ('Hệ thống thông tin'),
       ('Mạng máy tính và truyền thông'),
       ('Trí tuệ nhân tạo (AI)'),
       ('An toàn thông tin'),
       ('Kỹ thuật máy tính'),
       ('Phát triển ứng dụng di động'),
       ('Công nghệ dữ liệu'),
       ('Công nghệ blockchain'),
       ('Kỹ thuật điện tử - viễn thông'),
       ('Kỹ thuật cơ khí'),
       ('Kỹ thuật xây dựng'),
       ('Kỹ thuật điện - điện tử'),
       ('Quản trị kinh doanh'),
       ('Kinh tế quốc tế'),
       ('Marketing'),
       ('Tài chính - Ngân hàng'),
       ('Ngôn ngữ Anh'),
       ('Quan hệ quốc tế'),
       ('Tâm lý học'),
       ('Luật kinh tế'),
       ('Y khoa'),
       ('Dược học'),
       ('Điều dưỡng'),
       ('Y tế công cộng');

INSERT INTO degree (degree_title)
VALUES ('Trung cấp'),
       ('Cao đẳng'),
       ('Đại học'),
       ('Thạc sĩ'),
       ('Tiến sĩ'),
       ('Phó giáo sư'),
       ('Giáo sư'),
       ('Chứng chỉ nghề'),
       ('Chứng chỉ ngoại ngữ'),
       ('Chứng chỉ tin học');

INSERT INTO account (email, password, role, status)
VALUES ('nguyenlptps12345@fpt.edu.vn', '$2a$10$Uhty2BY.RLblSrKhV7f9a.xCstyCVYihM/Ce9.cdpxR6pCd5ZqsSi', 'client', b'1'),
       ('leminhtps54321@fpt.edu.vn', '$2a$10$Uhty2BY.RLblSrKhV7f9a.xCstyCVYihM/Ce9.cdpxR6pCd5ZqsSi', 'freelancer', b'1'),
       ('tranvietps67890@fpt.edu.vn', '$2a$10$Uhty2BY.RLblSrKhV7f9a.xCstyCVYihM/Ce9.cdpxR6pCd5ZqsSi', 'client', b'0'),
       ('phamlantps98765@fpt.edu.vn', '$2a$10$Uhty2BY.RLblSrKhV7f9a.xCstyCVYihM/Ce9.cdpxR6pCd5ZqsSi', 'freelancer', b'1'),
       ('buiductps56789@fpt.edu.vn', '$2a$10$Uhty2BY.RLblSrKhV7f9a.xCstyCVYihM/Ce9.cdpxR6pCd5ZqsSi', 'freelancer', b'0');


INSERT INTO user (address, created_at, first_name, last_name, phone_number, account_id)
VALUES ('123 Phạm Văn Đồng, Hà Nội', '2024-10-14 15:30:45.123456', 'Nguyễn', 'Lê', '0988765432', 6),
       ('456 Nguyễn Văn Cừ, Đà Nẵng', '2024-10-14 16:00:30.654321', 'Lê', 'Minh', '0978765432', 7),
       ('789 Lê Lợi, TP.Hồ Chí Minh', '2024-10-14 17:15:20.987654', 'Trần', 'Việt', '0909876543', 8),
       ('101 Trần Hưng Đạo, Huế', '2024-10-14 18:05:55.112233', 'Phạm', 'Lan', '0932345678', 9),
       ('102 Nguyễn Trãi, Nha Trang', '2024-10-14 19:45:10.556677', 'Bùi', 'Đức', '0919876543', 10);


INSERT INTO account (email, password, role, status)
VALUES ('hoangltps11111@fpt.edu.vn', '$2a$10$Uhty2BY.RLblSrKhV7f9a.xCstyCVYihM/Ce9.cdpxR6pCd5ZqsSi', 'client', b'1'),
       ('trangntps22222@fpt.edu.vn', '$2a$10$Uhty2BY.RLblSrKhV7f9a.xCstyCVYihM/Ce9.cdpxR6pCd5ZqsSi', 'client', b'1');


INSERT INTO user (address, created_at, first_name, last_name, phone_number, account_id)
VALUES ('202 Lê Duẩn, Hà Nội', '2024-10-14 20:00:00.123456', 'Hoàng', 'Lê', '0941234567', 11),
       ('303 Lê Văn Sỹ, TP.Hồ Chí Minh', '2024-10-14 21:00:00.654321', 'Tràng', 'Nguyễn', '0959876543', 12);

INSERT INTO freelancer (hourly_rate, image, category_id, user_id)
VALUES (200000.00, 'avatar1.png', 1, 10),
       (300000.00, 'avatar2.png', 2, 3),
       (250000.00, 'avatar3.png', 3, 5),
       (180000.00, 'avatar4.png', 4, 7),
       (220000.00, 'avatar5.png', 5, 9);

INSERT INTO freelancer_skill (freelancer_id, skill_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (1, 4),
       (1, 5),
       (2, 2),
       (2, 3),
       (2, 4),
       (2, 5),
       (2, 6),
       (3, 1),
       (3, 3),
       (3, 4),
       (3, 5),
       (3, 6),
       (4, 2),
       (4, 4),
       (4, 5),
       (4, 6),
       (4, 7),
       (5, 1),
       (5, 3),
       (5, 4),
       (5, 5),
       (5, 6);


INSERT INTO client (from_price, to_price, type_price, user_id)
VALUES (50000.00, 100000.00, 'theo giờ', 4),
       (200000.00, 500000.00, 'theo sản phẩm', 6);


INSERT INTO client (from_price, to_price, type_price, user_id)
VALUES (100000.00, 300000.00, 'theo giờ', 11),
       (150000.00, 450000.00, 'theo sản phẩm', 12);

INSERT INTO company (address, company_name, description, phone_contact, client_id)
VALUES ('123 Đường 1, Quận 1, TP. Hồ Chí Minh', 'Công ty TNHH ABC', 'Chuyên cung cấp dịch vụ công nghệ thông tin',
        '0901234567', 1),
       ('456 Đường 2, Quận 2, TP. Hồ Chí Minh', 'Công ty Cổ phần XYZ', 'Cung cấp giải pháp phần mềm và dịch vụ tư vấn',
        '0912345678', 2);


INSERT INTO job (created_at, date_end, date_start, description, from_price, hour_work, job_opportunity, scope, status,
                 title, to_price, type_price, category_id, client_id)
VALUES ('2024-10-01 09:00:00.000000', '2024-10-31 17:00:00.000000', '2024-10-01 09:00:00.000000',
        'Thiết kế giao diện cho ứng dụng di động', 200000.00, 40, b'1', 'Thiết kế và phát triển giao diện', 'Pending',
        'Thiết kế ứng dụng di động', 500000.00, 'theo sản phẩm', 1, 1),
       ('2024-10-02 10:00:00.000000', '2024-11-15 18:00:00.000000', '2024-10-02 10:00:00.000000',
        'Phát triển phần mềm quản lý bán hàng', 300000.00, 60, b'1', 'Phát triển và bảo trì phần mềm', 'InProgress',
        'Phát triển phần mềm bán hàng', 700000.00, 'theo giờ', 2, 2),
       ('2024-10-05 11:00:00.000000', '2024-10-20 15:00:00.000000', '2024-10-05 11:00:00.000000',
        'Viết nội dung cho website', 150000.00, 20, b'1', 'Viết bài và tối ưu hóa SEO', 'Completed',
        'Viết nội dung website', 300000.00, 'theo sản phẩm', 3, 3),
       ('2024-10-10 08:30:00.000000', '2024-10-25 17:00:00.000000', '2024-10-10 08:30:00.000000',
        'Quảng cáo trên mạng xã hội', 50000.00, 15, b'1', 'Chiến lược quảng cáo và tiếp thị', 'Pending',
        'Quảng cáo trên Facebook', 120000.00, 'theo giờ', 4, 4),
       ('2024-10-12 09:45:00.000000', '2024-11-01 18:00:00.000000', '2024-10-12 09:45:00.000000',
        'Bảo trì hệ thống mạng', 100000.00, 30, b'1', 'Kiểm tra và bảo trì hệ thống', 'Pending',
        'Bảo trì hệ thống mạng', 250000.00, 'theo sản phẩm', 5, 1),
       ('2024-10-15 10:00:00.000000', '2024-11-30 17:00:00.000000', '2024-10-15 10:00:00.000000',
        'Xây dựng website thương mại điện tử', 500000.00, 80, b'1', 'Phát triển website và tích hợp thanh toán',
        'Pending', 'Website thương mại điện tử', 1200000.00, 'theo sản phẩm', 1, 1),
       ('2024-10-16 09:30:00.000000', '2024-11-10 17:00:00.000000', '2024-10-16 09:30:00.000000',
        'Tạo video giới thiệu sản phẩm', 250000.00, 25, b'1', 'Lên kịch bản và quay video', 'Pending',
        'Video giới thiệu sản phẩm', 600000.00, 'theo sản phẩm', 2, 2),
       ('2024-10-17 14:15:00.000000', '2024-10-28 18:00:00.000000', '2024-10-17 14:15:00.000000',
        'Tư vấn chiến lược marketing', 150000.00, 10, b'1', 'Phân tích và đưa ra chiến lược marketing', 'Pending',
        'Tư vấn marketing', 300000.00, 'theo giờ', 3, 3),
       ('2024-10-18 11:00:00.000000', '2024-11-01 15:00:00.000000', '2024-10-18 11:00:00.000000', 'Sửa chữa máy tính',
        100000.00, 5, b'1', 'Khắc phục sự cố và bảo trì máy tính', 'Pending', 'Sửa chữa máy tính', 200000.00,
        'theo sản phẩm', 4, 4);


INSERT INTO job_skill (job_id, skill_id)
VALUES (1, 1),
       (1, 2),
       (1, 6),
       (1, 7),
       (2, 3),
       (2, 4),
       (2, 5),
       (2, 9),
       (3, 6),
       (3, 7),
       (3, 10),
       (4, 4),
       (4, 5),
       (4, 9),
       (5, 8),
       (5, 9),
       (5, 10),
       (6, 1),
       (6, 3),
       (6, 9),
       (6, 7),
       (7, 6),
       (7, 10),
       (7, 5),
       (7, 9),
       (8, 10),
       (8, 6),
       (8, 8),
       (8, 4),
       (9, 8),
       (9, 4),
       (9, 5),
       (9, 7);


INSERT INTO freelancer_job (is_selected, status, freelancer_id, job_id)
VALUES (b'1', 'Applied', 1, 1),    -- Freelancer 1 đã ứng tuyển vào Job 1 và được chọn
       (b'0', 'Applied', 2, 1),    -- Freelancer 2 đã ứng tuyển vào Job 1 nhưng không được chọn
       (b'0', 'Applied', 4, 1),    -- Freelancer 4 đã ứng tuyển vào Job 1 nhưng không được chọn
       (b'1', 'InProgress', 3, 2), -- Freelancer 3 đã ứng tuyển vào Job 2 và đang thực hiện
       (b'0', 'Cancelled', 4, 2),  -- Freelancer 4 đã ứng tuyển vào Job 2 nhưng đã hủy
       (b'1', 'Completed', 5, 3),  -- Freelancer 5 đã ứng tuyển vào Job 3 và đã hoàn thành
       (b'0', 'Cancelled', 1, 3),  -- Freelancer 1 đã ứng tuyển vào Job 3 và đang thực hiện
       (b'1', 'Applied', 2, 4),    -- Freelancer 2 đã ứng tuyển vào Job 4 và được chọn
       (b'0', 'Cancelled', 3, 4),  -- Freelancer 3 đã ứng tuyển vào Job 4 nhưng đã hủy
       (b'1', 'Applied', 4, 4),    -- Freelancer 6 đã ứng tuyển vào Job 4 và được chọn
       (b'1', 'Completed', 4, 5),  -- Freelancer 4 đã ứng tuyển vào Job 5 và đã hoàn thành
       (b'0', 'Cancelled', 5, 5),  -- Freelancer 5 đã ứng tuyển vào Job 5 nhưng đã hủy
       (b'1', 'Applied', 1, 6),    -- Freelancer 1 đã ứng tuyển vào Job 6 và được chọn
       (b'0', 'Applied', 2, 6),    -- Freelancer 2 đã ứng tuyển vào Job 6 nhưng đã hủy
       (b'0', 'Applied', 3, 6),    -- Freelancer 7 đã ứng tuyển vào Job 6 nhưng đã hủy
       (b'0', 'Applied', 5, 6),    -- Freelancer 8 đã ứng tuyển vào Job 6 nhưng đã hủy
       (b'1', 'Completed', 3, 7),  -- Freelancer 3 đã ứng tuyển vào Job 7 và đã hoàn thành
       (b'0', 'Cancelled', 4, 7),  -- Freelancer 4 đã ứng tuyển vào Job 7 nhưng đã hủy
       (b'1', 'Applied', 5, 8),    -- Freelancer 5 đã ứng tuyển vào Job 8 và được chọn
       (b'0', 'Cancelled', 1, 8),  -- Freelancer 1 đã ứng tuyển vào Job 8 nhưng đã hủy
       (b'1', 'Cancelled', 2, 9),  -- Freelancer 2 đã ứng tuyển vào Job 9 nhưng đã hủy
       (b'0', 'InProgress', 3, 9); -- Freelancer 3 đã ứng tuyển vào Job 9 và đang thực hiện

INSERT INTO education (date_start, date_end, description, degree_id, freelancer_id, major_id, school_id)
VALUES ('2018-09-01 00:00:00.000000', '2022-06-30 00:00:00.000000', 'Cử nhân Công nghệ thông tin', 1, 1, 1,
        1),                                                                                           -- Freelancer 1
       ('2017-09-01 00:00:00.000000', '2021-06-30 00:00:00.000000', 'Cử nhân Thiết kế đồ họa', 1, 2, 2,
        2),                                                                                           -- Freelancer 2
       ('2019-09-01 00:00:00.000000', '2023-06-30 00:00:00.000000', 'Thạc sĩ Quản trị kinh doanh', 2, 3, 3,
        3),                                                                                           -- Freelancer 3
       ('2016-09-01 00:00:00.000000', '2020-06-30 00:00:00.000000', 'Cử nhân Marketing', 1, 4, 4, 4), -- Freelancer 4
       ('2018-09-01 00:00:00.000000', '2022-06-30 00:00:00.000000', 'Cử nhân Khoa học dữ liệu', 1, 5, 5,
        5); -- Freelancer 5

