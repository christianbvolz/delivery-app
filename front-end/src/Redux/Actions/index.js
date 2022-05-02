// import { fetchMyApi } from '../../Api/fetch';

export const NEW_ACTION = 'NEW_ACTION';
// export const USER_LOGIN_SUCESS = 'USER_LOGIN_SUCESS';
// export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';

export const setAnything = (payload) => ({
  type: NEW_ACTION,
  payload,
});

// export const postUserLoginSucess = (payload) => ({
//   type: USER_LOGIN_SUCESS,
//   payload,
// });

// export const postUserLoginError = (payload) => ({
//   type: USER_LOGIN_ERROR,
//   payload,
// });

// export const postUserLoginThunk = () => async (dispatch) => {
//   try {
//     const response = await fetchMyApi('/login');
//     const payload = {
//       email: response.email,
//       password: response.password,
//     };
//     dispatch(postUserLoginSucess(payload));
//   } catch (error) {
//     dispatch(postUserLoginError(error));
//   }
// };
