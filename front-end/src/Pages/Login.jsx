import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { Button, ButtonOnClick, Input } from '../Components/Atoms';
import { validateEmail, validatePassword } from '../Utils/Verifications/verify';
import { userRelatedRequests } from '../Services/request';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [showError, setShowError] = useState(false); // This is a false boolean if there's no error, or a string (and thus true) that shows the error
  const history = useHistory();

  const routeChange = () => {
    const path = '/register';
    history.push(path);
  };

  const loginSubmit = async (event) => {
    event.preventDefault();
    try {
      const endpoint = '/login';
      const user = await userRelatedRequests(endpoint, { email, password });
      localStorage.setItem('user', JSON.stringify(user));
      setIsLogged(true);
    } catch (error) {
      setShowError(error.response.data.message);
      // setFailedTryLogin(true);
      // setIsLogged(false);
    }
  };

  return isLogged ? (<Redirect to="/customer/products" />) : (
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
      <ButtonOnClick
        testid="common_login__button-register"
        disabled={ false }
        onClick={ routeChange }
      >
        Ainda não tenho conta
      </ButtonOnClick>
      <h4
        data-testid="common_login__element-invalid-email"
        className={ `error-msg${showError ? ' error-active' : ''}` }
      >
        {showError}
      </h4>
    </main>
  );
};

export default Login;
