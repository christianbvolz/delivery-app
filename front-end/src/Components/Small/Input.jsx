import PropTypes from 'prop-types';
import React from 'react';

const Input = ({ placeholder, testId, name, onChange, value, type }) => (
  <input
    type={ type }
    name={ name }
    value={ value }
    onChange={ onChange }
    data-testid={ testId }
    placeholder={ placeholder }
  />);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Input;
