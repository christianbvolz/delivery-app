const statusErrorString = (msg) => {
  switch (msg) {
    case 'string.base':
      return 422;
    case 'string.min':
      return 422;
    case 'string.max':
      return 422;
    default:
      return 400;
  }
};

const statusErrorNumber = (msg) => {
  switch (msg) {
    case 'number.min':
      return 422;
    case 'number.base':
      return 422;
    default:
      return 400;
  }
};

const statusErrorRedirect = (msg) => {
  if (msg.includes('string')) return statusErrorString(msg);
  return statusErrorNumber(msg);
};

module.exports = statusErrorRedirect;