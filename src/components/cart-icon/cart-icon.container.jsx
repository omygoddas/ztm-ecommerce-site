import React from 'react';
import { graphql } from 'react-apollo';
import { flowRight } from 'lodash';

import CartIcon from './cart-icon.component';
import { GET_ITEM_COUNT, TOGGLE_CART_HIDDEN } from '../../graphql/resolvers';

const CartIconContainer = ({ data: { itemCount }, toggleCartHidden }) => (
  <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount} />
);

export default flowRight(
  graphql(GET_ITEM_COUNT),
  graphql(TOGGLE_CART_HIDDEN, { name: 'toggleCartHidden' })
)(CartIconContainer);
