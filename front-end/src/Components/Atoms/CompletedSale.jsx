import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonOnClick } from '.';

const CompletedSale = ({ saleId }) => {
  const history = useHistory();
  return (
    <div>
      <h1>Compra realizada com sucesso!</h1>
      <ButtonOnClick
        testid=""
        disabled={ false }
        onClick={ () => history.push(`/customer/orders/${saleId}`) }
      >
        Ir para detalhes do pedido
      </ButtonOnClick>
    </div>
  );
};

CompletedSale.propTypes = {
  saleId: PropTypes.number.isRequired,
};

export default CompletedSale;
