import React from 'react';
import { Menu, Avatar, Button } from 'antd';
import { UserOutlined, LogoutOutlined, SettingOutlined, TeamOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function UserMenu({ userName, userRole }) {
    return (
        <Menu>
            <Menu.Item key="1" style={{ height: 'auto', padding: '12px 0' }}>
                <Link to={localStorage.getItem("userRole") === "freelancer" ? "/freelancer-info" : "/client-info"} style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar size="large" icon={<UserOutlined />} />
                    <div style={{ marginLeft: 10 }}>
                        <div style={{ fontWeight: 'bold' }}>{userName || "User Name"}</div>
                        <div>{userRole || "User Role"}</div>
                    </div>
                </Link>
                <div style={{ marginTop: 10 }}>
                    <Button type="primary" size="small">Online</Button>
                    <Button size="small" style={{ marginLeft: 5 }}>Invisible</Button>
                </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="2" icon={<SettingOutlined />}>Theme: Light</Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined />}>Invite a Coworker</Menu.Item>
            <Menu.Item key="4" icon={<SettingOutlined />}>Settings</Menu.Item>
            <Menu.Item key="5" onClick={() => localStorage.clear()} icon={<LogoutOutlined />}><Link to="/login">Logout</Link></Menu.Item>
        </Menu>
    );
}

export default UserMenu;
