import axios from 'axios';

const baseURL = `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`;

const userRelatedRequests = async (endpoint, body) => {
  const { data } = await axios.post((baseURL + endpoint), body);
  return data;
};

const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

const ProductsRelatedRequests = async (endpoint) => {
  const { data } = await axios.get((baseURL + endpoint));
  return data;
};

const SalesRelatedRequests = async (endpoint, Authorization) => {
  const { data } = await axios.get((baseURL + endpoint), { headers: { Authorization } });

  return data;
};

const saleProductsRelatedRequests = async (endpoint, body, Authorization) => {
  const result = await axios.post(
    (baseURL + endpoint),
    body,
    { headers: { Authorization } },
  );
  return result;
};

const SellersRelatedRequests = async (endpoint) => {
  const { data } = await axios.get((baseURL + endpoint));
  return data;
};

const getRequests = async (endpoint, Authorization) => {
  const result = await axios
    .get((baseURL + endpoint), { headers: { Authorization } });

  return result.data;
};

const setStatusRequests = async (endpoint, body, Authorization) => {
  const { data } = await axios.post(
    (baseURL + endpoint),
    body,
    { headers: { Authorization } },
  );

  return data;
};

export {
  userRelatedRequests,
  setToken,
  ProductsRelatedRequests,
  SalesRelatedRequests,
  saleProductsRelatedRequests,
  SellersRelatedRequests,
  getRequests,
  setStatusRequests,
};
