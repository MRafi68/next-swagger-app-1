"use client";

import { Layout, Menu } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Sider } = Layout;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const menuItems = [
        {
            key: "1",
            icon: <DatabaseOutlined />,
            label: "Items",
        },
    ];

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} items={menuItems} />
        </Sider>
    );
};

export default Sidebar;
