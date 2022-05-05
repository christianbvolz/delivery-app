import {
  addToCart, ADD_TO_CART,
} from '../Actions';

const INITIAL_STATE = {
  cart: [],
};

function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_TO_CART:
      return {
        ...state,
        cart: cart.push(payload),
    }
    return {
      ...state,
      cart: cart.push(payload),
    };
  default:
    return state;
  }
}

export default cartReducer;
