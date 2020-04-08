import "./Header.scss";

import { Button, Layout, Avatar } from "antd";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";

import history from "../../stores/history";
import { AppStoreContext } from "../../stores/appStore";

const Header: React.FC = observer(() => {
  const { Header } = Layout;
  const store = useContext(AppStoreContext);

  return (
    <Header className="header">
      <div
        onClick={() => {
          history.push("/");
        }}
        className="logo"
      >
        TapForms
      </div>
      <div className="actions">
        {!store.isAuth && (
          <div className="login">
            <Button onClick={() => history.push("/login")} type="primary">
              Login
            </Button>
            <Button onClick={() => history.push("/register")}>Register</Button>
          </div>
        )}
        {store.isAuth && (
          <div className="authenticated">
            <p>{store.login}</p>
            <div className="logout">
              <Button
                onClick={() => {
                  store.logout();
                  history.push("/");
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </Header>
  );
});

export default Header;
