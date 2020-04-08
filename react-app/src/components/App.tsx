import "./App.scss";
import "antd/dist/antd.css";

import { Layout } from "antd";
import React, { useContext } from "react";
import { Route, Router, Switch } from "react-router-dom";

import history from "../stores/history";
import HomeView from "../views/HomeView";
import LoginView from "../views/LoginView";
import RegisterView from "../views/RegisterView";
import Header from "./Layout/Header";
import Sider from "./Layout/Sider";
import { observer } from "mobx-react-lite";
import { AppStoreContext } from "../stores/appStore";

const App: React.FC = observer(() => {
  const store = useContext(AppStoreContext);
  const { Content } = Layout;
  return (
    <Router history={history}>
      <Layout style={{ height: "100vh" }}>
        <Header />
        <Layout>
          {store.isAuth && <Sider />}
          <Content className="content-wrapper">
            <Switch>
              <Route path="/register" component={RegisterView} />
              <Route path="/login" component={LoginView} />
              <Route path="/" component={HomeView} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
})

export default App;
