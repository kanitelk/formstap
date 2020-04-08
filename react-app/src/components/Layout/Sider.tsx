import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { LeftOutlined, RightOutlined, UserOutlined } from "@ant-design/icons";
import "./Sider.scss";

const Sider: React.FC = () => {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      className="sider"
      trigger={collapsed ? <RightOutlined /> : <LeftOutlined />}
      collapsible
      theme="light"
      collapsed={collapsed}
      onCollapse={(val) => setCollapsed(val)}
      breakpoint="md"
    >
      <div className="main">
        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <UserOutlined />
            <span>nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <UserOutlined />
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <UserOutlined />
            <span>nav 3</span>
          </Menu.Item>
        </Menu>
      </div>
    </Sider>
  );
};

export default Sider;
