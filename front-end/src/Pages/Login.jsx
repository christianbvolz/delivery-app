import React, { useState } from 'react';
import { Button, Input } from '../Components/Atoms';
import { validateEmail, validatePassword } from '../Utils/Verifications/verify';
import { requestLogin } from '../Services/request';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false); // This is a false boolean if there's no error, or a string (and thus true) that shows the error

  const loginSubmit = async (event) => {
    event.preventDefault();
    try {
      const endpoint = '/login';

      const token = await requestLogin(endpoint, { email, password });
      console.log(token);
      // localStorage.setItem('user', JSON.stringify({ token, ...user }));
      // setIsLogged(true);
    } catch (error) {
      setShowError(error.response.data.message);
      // setFailedTryLogin(true);
      // setIsLogged(false);
    }
  };

  return (
    <main>
      <form onSubmit={ loginSubmit }>
        <Input
          placeholder="Email"
          name="email"
          type="text"
          testid="common_login__input-email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <Input
          placeholder="Password"
          name="password"
          type="password"
          testid="common_login__input-password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        <Button
          testid="common_login__button-login"
          disabled={ !(validateEmail(email) && validatePassword(password)) }
        >
          LOGIN
        </Button>
      </form>
      <Button
        testid="common_login__button-register"
        disabled={ false }

      >
        Ainda não tenho conta
      </Button>
      <h4
        testid="common_login__element-invalid-email"
        className={ `error-msg${showError ? ' error-active' : ''}` }
      >
        {showError}
      </h4>
    </main>
  );
};

export default Login;
