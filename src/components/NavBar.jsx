import React from 'react'
import { Menu } from 'antd';


const NavBar = () => {
    return (
        <Menu mode="horizontal" style={{ background: "#1677ff", color: "#fff", fontWeight: "bold" }}>
            <Menu.Item key="main" style={{ marginRight: "50px" }}>
                <a href="/">OTEL POC</a>
            </Menu.Item>
            <Menu.Item key="java">
                <a href="/java-stack">Java</a>
            </Menu.Item>
            <Menu.Item key="Javascript">
                <a href="/ts-stack">Typescript</a>
            </Menu.Item>
            <Menu.Item key="Python">
                <a href="/py-stack">Python</a>
            </Menu.Item>
        </Menu>
    );
}

export default NavBar