import {
  UPDATE_CART,
} from '../Actions';

const INITIAL_STATE = {
  cart: [],
};

function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case UPDATE_CART:
    return {
      ...state,
      cart: action.payload,
    };
  default:
    return state;
  }
}

export default cartReducer;
