import React from 'react';

import { flowRight } from 'lodash';
import { graphql } from 'react-apollo';

import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  CLEAR_ITEMS_FROM_CART,
} from '../../graphql/resolvers';

import CheckoutItem from './checkout-item.component';

// HOC approach
const CheckoutItemContainer = ({
  addItemToCart,
  removeItemFromCart,
  clearItemsFromCart,
  ...props
}) => (
  <CheckoutItem
    {...props}
    addItem={(item) => addItemToCart({ variables: { item } })}
    removeItem={(item) => removeItemFromCart({ variables: { item } })}
    clearItem={(item) => clearItemsFromCart({ variables: { item } })}
  />
);

// Same approach:
// const CheckoutItemContainer = (props) => (
//   <Mutation mutation={ADD_ITEM_TO_CART}>
//     {(addItemToCart) => (
//       <Mutation mutation={REMOVE_ITEM_FROM_CART}>
//         {(removeItemFromCart) => (
//           <Mutation mutation={CLEAR_ITEMS_FROM_CART}>
//             {(clearItemsFromCart) => (
//               <CheckoutItem
//                 {...props}
//                 addItem={(item) => addItemToCart({ variables: { item } })}
//                 removeItem={(item) =>
//                   removeItemFromCart({ variables: { item } })
//                 }
//                 clearItem={(item) =>
//                   clearItemsFromCart({ variables: { item } })
//                 }
//               />
//             )}
//           </Mutation>
//         )}
//       </Mutation>
//     )}
//   </Mutation>
// );

export default flowRight(
  graphql(ADD_ITEM_TO_CART, { name: 'addItemToCart' }),
  graphql(REMOVE_ITEM_FROM_CART, { name: 'removeItemFromCart' }),
  graphql(CLEAR_ITEMS_FROM_CART, { name: 'clearItemsFromCart' })
)(CheckoutItemContainer);
