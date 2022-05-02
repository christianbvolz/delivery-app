import PropTypes from 'prop-types';
import React from 'react';

const Button = ({ children, testId, disabled }) => (
  <button
    type="submit"
    disabled={ disabled }
    data-testid={ testId }
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool.isRequired,
  testId: PropTypes.string.isRequired,
};

export default Button;
