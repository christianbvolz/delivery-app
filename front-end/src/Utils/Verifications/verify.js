const MIN_PASSWORD_LENGTH = 6;
const MIN_NAME_LENGTH = 12;

// Inspiração para o regex utilizado: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
// Pode ser testado aqui: https://regex101.com/

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePassword = (password) => (password.length >= MIN_PASSWORD_LENGTH);

const validateName = (name) => (name.length >= MIN_NAME_LENGTH);

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
};
