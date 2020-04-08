import "./LoginView.scss";

import React from "react";

import LoginForm from "../../components/Register/LoginForm";

const LoginView: React.FC = () => {
  return (
    <div className="login-view">
      <LoginForm />
    </div>
  );
};

export default LoginView;
