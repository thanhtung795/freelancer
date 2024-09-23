import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  InputGroup,
  Form,
  Button,
  Nav,
  Navbar,
  Dropdown,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
function NavbarGuest() {
  const [dropdownTitle, setDropdownTitle] = useState("Tài năng");
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
          <NavDropdown title="Tiềm kiếm tài năng" id="navbarDropdown">
            <NavDropdown.Item href="#">Tiềm kiếm tài năng</NavDropdown.Item>
            <NavDropdown.Item href="#">Tìm kiếm công việc</NavDropdown.Item>
            <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Tìm kiếm công việc" id="navbarDropdown">
            <NavDropdown.Item href="#">Action</NavDropdown.Item>
            <NavDropdown.Item href="#">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
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

          <Button
            variant="light"
            className="ms-2"
            style={{ minWidth: "120px" }}
          >
            <Link to={"/login"} style={{ color: "black" }}>
              Đăng nhập
            </Link>
          </Button>
          <Button
            style={{ backgroundColor: "#2671e0", minWidth: "120px" }}
            className="ms-2"
          >
            <Link to={"/joinAs"} style={{ color: "white" }}>
              Đăng ký
            </Link>
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarGuest;
