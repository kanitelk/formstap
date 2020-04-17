import "./LoginForm.scss";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { AppStoreContext } from "../../stores/appStore";
import { login } from "../../services/authAPI";
import history from "../../stores/history";
import { httpErrorHandler } from "../../services/utils";

const LoginForm: React.FC = observer(() => {
  const store = useContext(AppStoreContext)
  const onSubmit = async ({username, password}: any) => {
    try {
      let r = await login(username, password);
      await store.setAuth(r.token)
      history.push('/')
    } catch (error) {
      httpErrorHandler(error)
    }
  };
  return (
    <Card title="Login" className="login-form__card">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            autoFocus
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <div className="actions">
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            <NavLink to="/register">Register</NavLink>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
});

export default LoginForm;
