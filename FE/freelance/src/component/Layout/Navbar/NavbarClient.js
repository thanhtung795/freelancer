import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  InputGroup,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Avatar, Space, Dropdown as AntDropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UserMenu from "./UserMenu";

function NavbarClient() {
  const [dropdownTitle, setDropdownTitle] = useState("Tài năng");
  const [userName, setUserName] = useState("Bùi Minh Quang Fpl Hcm");
  const [userRole, setUserRole] = useState("Client");

  const menu = <UserMenu userName={userName} userRole={userRole} />;

  return (
    <Navbar expand="lg" className="mt-0 px-4 bg-white">
      <Navbar.Brand as={Link} to="/">
        <img
          width="50"
          height="50"
          src="/favicon.ico"
          alt="freeCodeCamp Logo"
          className="ms-5"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarSupportedContent" />
      <Navbar.Collapse id="navbarSupportedContent">
        <Nav className="me-auto">
          <NavDropdown title="Tìm kiếm tài năng" id="navbarDropdown">
            <NavDropdown.Item as={Link} to="/job">
              Đăng việc
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/freelancer-list">
              Danh sách freelancer
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/list-job-uploaded">
              Danh sách job đã đăng
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form className="d-flex">
          <InputGroup>
            <Dropdown>
              <Dropdown.Toggle
                style={{ backgroundColor: "#2671e0" }}
                id="dropdown-basic"
                className="border-0 rounded-start-pill"
              >
                {dropdownTitle}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  href="#/action-1"
                  onClick={() => setDropdownTitle("Tài năng")}
                >
                  Tài năng
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-2"
                  onClick={() => setDropdownTitle("Dự án")}
                >
                  Dự án
                </Dropdown.Item>
                <Dropdown.Item
                  href="#/action-3"
                  onClick={() => setDropdownTitle("Công việc")}
                >
                  Công việc
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control placeholder="Search..." aria-label="Search" />
            <InputGroup.Text className="rounded-end-pill">
              <i className="fas fa-search"></i>
            </InputGroup.Text>
          </InputGroup>
          <Space size="middle" style={{ marginLeft: 10 }}>
            <AntDropdown overlay={menu} trigger={["click"]}>
              <Avatar size="large" icon={<UserOutlined />} />
            </AntDropdown>
          </Space>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarClient;
