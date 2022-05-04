import axios from 'axios';

const baseURL = `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`;

// export const setToken = (token) => {
//   api.defaults.headers.common.Authorization = token;
// };

const requestLogin = async (endpoint, body) => {
  const { data: { token } } = await axios.post(baseURL + endpoint, body);
  console.log('Dentro de request o token: ', token);
  return token;
};

export {
  requestLogin,
};

