import React, { useContext } from "react";
import "./RegisterForm.scss";
import { Card, Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { register } from "../../services/authAPI";
import { observer } from "mobx-react-lite";
import { AppStoreContext } from "../../stores/appStore";
import history from "../../stores/history";
import { httpErrorHandler } from "../../services/utils";

const RegisterForm: React.FC = observer(() => {
  const store = useContext(AppStoreContext);

  const onSubmit = async ({ username, password, email }: any) => {
    try {
      let r = await register(username, password, email);
      await store.setAuth(r.token)
      history.push('/');
    } catch (error) {
      httpErrorHandler(error);
    }
  };
  return (
    <Card title="Register" className="register-form__card">
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
          name="email"
          rules={[{ required: false, message: "Please input email!" }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            type="email"
            placeholder="E-mail"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
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
              Register
            </Button>
            <NavLink to="/login">Login</NavLink>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
});

export default RegisterForm;
