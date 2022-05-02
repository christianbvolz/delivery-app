// Inspiração para o regex utilizado: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
// Pode ser testado aqui: https://regex101.com/

const MIN_PASSWORD_LENGTH = 6;

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePassword = (password) => (password.length >= MIN_PASSWORD_LENGTH);

module.exports = {
  validateEmail,
  validatePassword,
};
