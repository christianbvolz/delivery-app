import PropTypes from 'prop-types';
import React from 'react';

function PriceTotal({ arr }) {
  const somaTotal = arr.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div>
      { somaTotal }
    </div>
  );
}

PriceTotal.propTypes = {
  arr: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default PriceTotal;
