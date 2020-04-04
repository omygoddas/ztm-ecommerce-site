import CartActionTypes from './cart.types';

// payload is an optional property on Action object,
// and we don't pass in any payload here
export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});
