import {
  UPDATE_CART_PRICE,
} from '../Actions';

const INITIAL_STATE = {
  totalPrice: '0.00',
};

function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case UPDATE_CART_PRICE:
    return {
      ...state,
      totalPrice: action.payload,
    };
  default:
    return state;
  }
}

export default cartReducer;
