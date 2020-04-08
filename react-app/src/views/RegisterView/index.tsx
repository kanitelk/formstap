import React from 'react';
import RegisterForm from '../../components/Register/RegisterForm';
import './RegisterView.scss'

const RegisterView: React.FC = () => {
  return <div className="register-view">
    <RegisterForm />
  </div>
}

export default RegisterView;