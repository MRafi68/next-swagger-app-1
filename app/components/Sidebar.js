"use client"

import { Layout, Menu } from "antd"
import { DatabaseOutlined } from "@ant-design/icons"
import { useState } from "react"

const { Sider } = Layout;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<DatabaseOutlined />}>
              Items
            </Menu.Item>
          </Menu>
        </Sider>
    );
}

export default Sidebar;
