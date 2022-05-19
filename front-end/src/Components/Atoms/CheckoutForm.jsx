import React from 'react';
import PropTypes from 'prop-types';
import { ButtonOnClick, Input } from '.';

export default function CheckoutForm({
  sellers,
  selectedSeller,
  setSelectedSeller,
  deliveryAdress,
  setDeliveryAdress,
  deliveryNumber,
  setDeliveryNumber,
  finishOrder,
}) {
  return (
    <div>
      <select
        data-testid="customer_checkout__select-seller"
        onChange={ ({ target }) => setSelectedSeller(+target.value) }
        value={ selectedSeller }
      >
        {sellers.map(({ name, id }) => (
          <option value={ id } key={ name }>{ name }</option>
        ))}
      </select>
      <Input
        placeholder="Endereço de entrega"
        testid="customer_checkout__input-address"
        name="deliveryAdress"
        onChange={ ({ target }) => setDeliveryAdress(target.value) }
        value={ deliveryAdress }
        type="text"
      />
      <Input
        placeholder="Número"
        testid="customer_checkout__input-addressNumber"
        name="deliveryNumber"
        onChange={ ({ target }) => setDeliveryNumber(target.value) }
        value={ deliveryNumber }
        type="number"
      />
      <ButtonOnClick
        testid="customer_checkout__button-submit-order"
        disabled={ false }
        onClick={ finishOrder }
      >
        Finalizar pedido
      </ButtonOnClick>
    </div>
  );
}

CheckoutForm.propTypes = {
  sellers: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    password: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
  selectedSeller: PropTypes.number.isRequired,
  setSelectedSeller: PropTypes.func.isRequired,
  deliveryAdress: PropTypes.string.isRequired,
  setDeliveryAdress: PropTypes.func.isRequired,
  deliveryNumber: PropTypes.string.isRequired,
  setDeliveryNumber: PropTypes.func.isRequired,
  finishOrder: PropTypes.func.isRequired,
};
