import axios from 'axios';

const baseURL = `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`;

const userRelatedRequests = async (endpoint, body) => {
  const { data } = await axios.post((baseURL + endpoint), body);
  console.log('Dentro de request o token: ', data.token);
  return data;
};

const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

const ProductsRelatedRequests = async (endpoint) => {
  const { data } = await axios.get((baseURL + endpoint));
  return data;
};

export {
  userRelatedRequests,
  setToken,
  ProductsRelatedRequests,
};
