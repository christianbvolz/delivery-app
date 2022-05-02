import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

// perguntar sobre esse process.env.react_app na monitoria

// export const setToken = (token) => {
//   api.defaults.headers.common.Authorization = token;
// };

export const requestLogin = async (endpoint, body) => {
  const { token, message } = await api.post(endpoint, body);
  if (token) return token;
  return message;
};

export default api;
