import React from 'react';

import { Mutation, Query } from 'react-apollo';

import CartDropdown from './cart-dropdown.component';
import { GET_CART_ITEMS, TOGGLE_CART_HIDDEN } from "../../graphql/resolvers";

// wrap the componetnt so it gets cartItems and toggleCartHidden
const CartDropdownContainer = () => (
  <Mutation mutation={TOGGLE_CART_HIDDEN}>
    {(toggleCartHidden) => (
      <Query query={GET_CART_ITEMS}>
        {({ data: { cartItems } }) => (
          <CartDropdown
            cartItems={cartItems}
            toggleCartHidden={toggleCartHidden}
          />
        )}
      </Query>
    )}
  </Mutation>
);

export default CartDropdownContainer;
