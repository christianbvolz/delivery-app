import React, { useState } from 'react';
import { Button, Input } from '../Components/Small';
import { validateEmail, validatePassword } from '../Utils/Verifications/verify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  return (
    <main>
      <Input
        placeholder="Email"
        name="email"
        type="text"
        testId="common_login__input-email"
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
      />
      <Input
        placeholder="Password"
        name="password"
        type="password"
        testId="common_login__input-password"
        value={ password }
        onChange={ (e) => setPassword(e.target.value) }
      />
      <Button
        testId="common_login__button-login"
        disabled={ !(validateEmail(email) && validatePassword(password)) }
      >
        LOGIN
      </Button>
      <Button
        testId="common_login__button-register"
        disabled={ false }
      >
        Ainda não tenho conta
      </Button>
      <h4
        data-testId="common_login__element-invalid-email"
        className={ `error-msg${showError ? ' error-active' : ''}` }
      >
        Erro aqui
      </h4>
    </main>
  );
};
export default Login;
