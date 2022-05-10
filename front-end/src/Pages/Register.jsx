import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Input } from '../Components/Atoms';
import {
  validateEmail,
  validatePassword,
  validateName } from '../Utils/Verifications/verify';
import { userRelatedRequests } from '../Services/request';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [showError, setShowError] = useState(false); // This is a false boolean if there's no error, or a string (and thus true) that shows the error

  const registerSubmit = async (event) => {
    event.preventDefault();
    try {
      const endpoint = '/register';

      const token = await userRelatedRequests(endpoint, { name, email, password });
      console.log(token);
      setIsLogged(true);
      localStorage.setItem('token', JSON.stringify(token));
      // setIsLogged(true);
    } catch (error) {
      setShowError(error.response.data.message);
      // setFailedTryLogin(true);
      // setIsLogged(false);
    }
  };

  return isLogged ? (<Redirect to="/customer/products" />) : (
    <main>
      <form onSubmit={ registerSubmit }>
        <Input
          placeholder="Name"
          name="name"
          type="text"
          testid="common_register__input-name"
          value={ name }
          onChange={ (e) => setName(e.target.value) }
        />
        <Input
          placeholder="Email"
          name="email"
          type="text"
          testid="common_register__input-email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <Input
          placeholder="Password"
          name="password"
          type="password"
          testid="common_register__input-password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        <Button
          testid="common_register__button-register"
          disabled={ !(validateEmail(email)
            && validatePassword(password)
            && validateName(name)) }
        >
          CADASTRAR
        </Button>
      </form>
      <h4
        data-testid="common_register__element-invalid_register"
        className={ `error-msg${showError ? ' error-active' : ''}` }
      >
        {showError}
      </h4>
    </main>
  );
};

export default Register;
