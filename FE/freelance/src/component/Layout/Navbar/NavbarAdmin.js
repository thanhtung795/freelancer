import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
    InputGroup,
    Form,
    Nav,
    Navbar,
    NavDropdown,
    Dropdown
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Avatar, Space, Dropdown as AntDropdown } from "antd";
import { UserOutlined } from '@ant-design/icons';
import UserMenu from "./UserMenu";

function NavbarClient() {
    const [dropdownTitle, setDropdownTitle] = useState("Tài năng");
    const [userName, setUserName] = useState("Bùi Minh Quang Fpl Hcm");
    const [userRole, setUserRole] = useState("Client");

    const menu = (
        <UserMenu userName={userName} userRole={userRole} />
    );

    return (
        <Navbar expand="lg" className="mt-0 px-4 bg-white">
            <Navbar.Brand as={Link} to="/admin">
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
                    
                </Nav>
                <Form className="d-flex">
                   
                    <Space size="middle" style={{ marginLeft: 10 }}>
                        <AntDropdown overlay={menu} trigger={['click']}>
                            <Avatar size="large" icon={<UserOutlined />} />
                        </AntDropdown>
                    </Space>
                </Form>
            </Navbar.Collapse>

        </Navbar>
    );
}

export default NavbarClient;