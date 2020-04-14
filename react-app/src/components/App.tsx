import "./App.scss";
import "antd/dist/antd.css";

import { Layout } from "antd";
import { observer } from "mobx-react-lite";
import React, { Suspense, useContext } from "react";
import { Route, Router, Switch } from "react-router-dom";

import { AppStoreContext } from "../stores/appStore";
import history from "../stores/history";
import HomeView from "../views/HomeView";
import Header from "./Layout/Header";
import FormView from "../views/FormView";
import { FormStoreContext } from "../stores/formStore";
import ResponcesView from "../views/ResponcesView";

const RegisterView = React.lazy(() => import("../views/RegisterView"));
const LoginView = React.lazy(() => import("../views/LoginView"));
const PanelView = React.lazy(() => import("../views/PanelView"));
const EditView = React.lazy(() => import("../views/EditView"));

const App: React.FC = observer(() => {
  const store = useContext(AppStoreContext);
  const formStore = useContext(FormStoreContext);
  const { Content } = Layout;
  return (
    <Router history={history}>
      <Layout style={{ height: "100vh" }}>
        {!formStore.formView && <Header />}
        <Layout>
          {/* {store.isAuth && <Sider />} */}
          <Content className="content-wrapper">
            <Suspense fallback={<p>Loading</p>}>
              <Switch>
                <Route path="/register" exact component={RegisterView} />
                <Route path="/login" exact component={LoginView} />
                <Route path="/edit/:id" exact component={EditView} />
                <Route path="/form/:id" exact component={FormView} />
                <Route path="/responces/:id" exact component={ResponcesView} />
                <Route
                  path="/"
                  exact
                  component={store.isAuth ? PanelView : HomeView}
                />
                <Route path="/">
                  <h1>404</h1>
                </Route>
              </Switch>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
});

export default App;
