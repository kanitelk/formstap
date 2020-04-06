import React from "react";
import "./App.scss";
import "antd/dist/antd.css";
import history from "../stores/history";
import { Route, Router, Switch } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import Header from "./Layout/Header";
import Sider from "./Layout/Sider";
import RegisterView from "../views/RegisterView";
import HomeView from "../views/HomeView";

function App() {
  const { Content } = Layout;
  return (
    <Router history={history}>
      <Layout style={{ height: "100vh" }}>
        <Header />
        <Layout>
          <Sider />
          <Content className="content-wrapper">
            <Switch>
              <Route path="/register" component={RegisterView} />
              <Route path="/" component={HomeView} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
