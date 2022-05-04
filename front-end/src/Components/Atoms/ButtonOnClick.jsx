import PropTypes from 'prop-types';
import React from 'react';

const ButtonOnClick = ({ children, testid, disabled, onClick }) => (
  <button
    type="submit"
    disabled={ disabled }
    data-testid={ testid }
    onClick={ onClick }
  >
    {children}
  </button>
);

ButtonOnClick.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool.isRequired,
  testid: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ButtonOnClick;
