export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

export const addToCart = (payload) => ({
  type: ADD_TO_CART,
  payload,
});

export const removeFromCart = (payload) => ({
  type: REMOVE_FROM_CART,
  payload,
})

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
