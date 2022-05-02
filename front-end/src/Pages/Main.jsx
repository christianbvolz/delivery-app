import React, { useEffect, useState } from 'react';

const PagExemplo = () => {
  const [value, setValue] = useState('Inicial');

  useEffect(() => {
    setValue('Valor2');
  }, []);

  return (
    <h1>{ value }</h1>
  );
};

export default PagExemplo;
