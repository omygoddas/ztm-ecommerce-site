import React from 'react';

import { graphql } from 'react-apollo';
import { flowRight } from 'lodash';

import CheckoutPage from './checkout.component';
import { GET_CART_ITEMS_AND_TOTAL } from '../../graphql/resolvers';

const CheckoutPageContainer = ({ data: { cartItems, cartTotal } }) => (
  <CheckoutPage cartItems={cartItems} total={cartTotal} />
);

export default flowRight(
  graphql(GET_CART_ITEMS_AND_TOTAL),
)(CheckoutPageContainer);

// Another approach without HOC:

// const CheckoutPageContainer = () => (
//   <Query query={GET_CART_ITEMS}>
//     {({ data: { cartItems } }) => (
//       <Query query={GET_CART_TOTAL}>
//         {({ data: { cartTotal } }) => (
//           <CheckoutPage cartItems={cartItems} total={cartTotal} />
//         )}
//       </Query>
//     )}
//   </Query>
// );

// export default CheckoutPageContainer;