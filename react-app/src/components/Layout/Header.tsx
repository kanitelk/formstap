import "./Header.scss";

import { Button, Layout, Avatar } from "antd";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";

import history from "../../stores/history";
import { AppStoreContext } from "../../stores/appStore";
import { FormStoreContext } from "../../stores/formStore";
import { Link } from "react-router-dom";

const Header: React.FC = observer(() => {
  const { Header } = Layout;
  const store = useContext(AppStoreContext);

  return (
    <Header className="header">
      {/* <Button onClick={() => alert(getFingerprint())}>FP</Button> */}
      <div
        onClick={() => {
          history.push("/");
        }}
        className="logo"
      >
        <h1>Tap.mn</h1>
        <p>Alpha</p>
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
            {store.telegram?.photo_url && <Avatar src={store.telegram?.photo_url} />}
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
