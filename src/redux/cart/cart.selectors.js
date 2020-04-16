import { createSelector } from 'reselect';

// input selector (doesn't use create Selector)
const selectCart = (state) => state.cart;

// output selector (use both input and create Selectors)
export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (accumulatedCost, cartItem) =>
      accumulatedCost + cartItem.quantity * cartItem.price,
    0
  )
);
