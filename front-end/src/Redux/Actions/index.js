export const UPDATE_CART = 'UPDATE_CART';

export const updateCart = (payload) => ({
  type: UPDATE_CART,
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
