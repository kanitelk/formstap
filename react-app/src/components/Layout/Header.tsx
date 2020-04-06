import "./Header.scss";

import { Layout, Button } from "antd";
import { observer } from "mobx-react-lite";
import React from "react";

const Header: React.FC = observer(() => {
  const { Header } = Layout;

  return (
    <Header className="header">
      <div className="logo">TapForms</div>
      <div className="actions">
        <div className="login">
          <Button type="primary">Login</Button>
        </div>
      </div>
    </Header>
  );
});

export default Header;
