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
} from "react-bootstrap";
import { Link } from "react-router-dom";
function NavbarApp() {
  const [dropdownTitle, setDropdownTitle] = useState("Talent");

  return (
      <Navbar expand="lg" className="mt-0 px-4">
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
            {/* <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="navbarDropdown">
              <NavDropdown.Item href="#">Action</NavDropdown.Item>
              <NavDropdown.Item href="#">Another action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Disabled
            </Nav.Link> */}
          </Nav>
          <Form className="d-flex">
            <InputGroup>
              <Dropdown>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className="border-0 rounded-start-pill"
                >
                  {dropdownTitle}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#/action-1"
                    onClick={() => setDropdownTitle("Talent")}
                  >
                    Talent
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-2"
                    onClick={() => setDropdownTitle("Project")}
                  >
                    Project
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => setDropdownTitle("Jobs")}
                  >
                    Jobs
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Form.Control placeholder="Search..." aria-label="Search" />
              <InputGroup.Text className="rounded-end-pill">
                <i className="fas fa-search"></i>
              </InputGroup.Text>
            </InputGroup>

            <Button variant="light" className="ms-2">
              <Link to={"/login"} style={{color: "black"}}>Login</Link>
            </Button>
            <Button variant="success" className="ms-2">
              <Link to={"/joinAs"} style={{color: "white"}} >Signup</Link>
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
  );
}

export default NavbarApp;
