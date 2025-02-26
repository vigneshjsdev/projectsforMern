import React from "react";
import { Menu, Dropdown, Button, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, LogoutOutlined, HomeOutlined, CarOutlined, ToolOutlined } from "@ant-design/icons";

function DefaultLayout(props) {
    const user = JSON.parse(localStorage.getItem("user"));

    const role=user.role
    console.log(role);
    

    const menu = (
        <Menu style={{ width: 150, borderRadius: 8, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
            <Menu.Item key="home" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="bookings" icon={<CarOutlined />}>
                <Link to="/userbookings">My Bookings</Link>
            </Menu.Item>
            {role==="admin"?
            <Menu.Item key="admin" icon={<ToolOutlined />}>
               <Link to="/admin">Admin</Link>
            </Menu.Item>:null}
            <Menu.Divider />
            <Menu.Item
                key="logout"
                icon={<LogoutOutlined />}
                onClick={() => {
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                }}
                style={{ color: "red", fontWeight: "bold" }}
            >
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="layout">
            {/* 🚗 Attractive Header */}
            <div className="header">
                <Row justify="space-between" align="middle">
                    <Col>
                        <h1 className="logo">
                            <Link to="/">🚗 Car Rental</Link>
                        </h1>
                    </Col>
                    <Col>
                        <Dropdown overlay={menu} placement="bottomRight">
                            <Button type="primary" shape="round" icon={<UserOutlined />}>
                                {user.username}
                            </Button>
                        </Dropdown>
                    </Col>
                </Row>
            </div>

            {/* 📌 Content Section */}
            <div className="content">{props.children}</div>

            {/* 📌 Stylish Footer */}
            <div className="footer">
                <p>© 2025 Car Rental. All Rights Reserved.</p>
            </div>

            {/* 🌟 CSS Styles */}
            <style jsx="true">{`
                .layout {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                }
                .header {
                    background: #001529;
                    color: white;
                    padding: 15px 50px;
                    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                }
                .logo a {
                    color: white;
                    font-size: 24px;
                    font-weight: bold;
                    text-decoration: none;
                    transition: color 0.3s;
                }
                .logo a:hover {
                    color: #40a9ff;
                }
                .content {
                    flex: 1;
                    padding: 20px 50px;
                    background: #f5f5f5;
                }
                .footer {
                    text-align: center;
                    background: #001529;
                    color: white;
                    padding: 15px 0;
                    font-size: 14px;
                    margin-top: auto;
                }
            `}</style>
        </div>
    );
}

export default DefaultLayout;
