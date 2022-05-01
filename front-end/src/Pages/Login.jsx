import React, { useEffect, useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('Email');

  useEffect(() => {
    setEmail('Email2');
  }, []);

  return (
    <h1>
      {`LOGIN + ${email}`}
    </h1>
  );
};
export default Login;
