import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ children, testid, disabled }) => (
  <button
    type="submit"
    disabled={ disabled }
    data-testid={ testid }
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool.isRequired,
  testid: PropTypes.string.isRequired,
};

export default Button;
