import { gql } from 'apollo-boost';

import {
  addItemToCart,
  getCartItemCount,
  removeItemFromCart,
  clearItemsFromCart,
  getCartTotal
} from './cart.utils';

export const typeDefs = gql`
  extend type Item {
    quantity: Int
  }

  extend type Mutation {
    ToggleCartHidden: Boolean!
    AddItemToCart(item: Item!): [Item]!
  }
`;

// @client: look value from local cache instead of Backend
// data (cartHidden, cartItems, etc.) are defined in index.js
export const GET_CART_HIDDEN = gql`
  {
    cartHidden @client
  }
`;

export const GET_CART_ITEMS = gql`
  {
    cartItems @client
  }
`;

export const GET_ITEM_COUNT = gql`
  {
    itemCount @client
  }
`;

export const GET_CART_TOTAL = gql`
  {
    cartTotal @client
  }
`;

export const GET_CART_ITEMS_AND_TOTAL = gql`
  {
    cartItems @client
    cartTotal @client
  }
`;

export const TOGGLE_CART_HIDDEN = gql`
  mutation ToggleCartHidden {
    toggleCartHidden @client
  }
`;

export const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($item: Item!) {
    addItemToCart(item: $item) @client
  }
`;

export const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemFromCart($item: Item!) {
    removeItemFromCart(item: $item) @client
  }
`;

export const CLEAR_ITEMS_FROM_CART = gql`
  mutation ClearItemsFromCart($item: Item!) {
    clearItemsFromCart(item: $item) @client
  }
`;

export const GET_COLLECTIONS = gql`
  {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

export const GET_COLLECTION_BY_TITLE = gql`
  query getCollectionsByTitle($title: String!) {
    getCollectionsByTitle(title: $title) {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

// arguments for Mutation functions: _root, _args, _context
export const resolvers = {
  Mutation: {
    toggleCartHidden: (_root, _args, { cache }) => {
      const { cartHidden } = cache.readQuery({
        query: GET_CART_HIDDEN,
      });

      cache.writeQuery({
        query: GET_CART_HIDDEN,
        data: { cartHidden: !cartHidden },
      });

      return !cartHidden;
    },

    addItemToCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });

      const newCartItems = addItemToCart(cartItems, item);

      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getCartItemCount(newCartItems) },
      });

      cache.writeQuery({
        query: GET_CART_TOTAL,
        data: { cartTotal: getCartTotal(newCartItems) },
      });

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems },
      });

      return newCartItems;
    },

    removeItemFromCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });

      const newCartItems = removeItemFromCart(cartItems, item);

      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getCartItemCount(newCartItems) },
      });

      cache.writeQuery({
        query: GET_CART_TOTAL,
        data: { cartTotal: getCartTotal(newCartItems) },
      });

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems },
      });

      return newCartItems;
    },

    clearItemsFromCart: (_root, { item }, { cache }) => {
      const { cartItems } = cache.readQuery({
        query: GET_CART_ITEMS,
      });

      const newCartItems = clearItemsFromCart(cartItems, item);

      cache.writeQuery({
        query: GET_ITEM_COUNT,
        data: { itemCount: getCartItemCount(newCartItems) },
      });

      cache.writeQuery({
        query: GET_CART_TOTAL,
        data: { cartTotal: getCartTotal(newCartItems) },
      });

      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: { cartItems: newCartItems },
      });

      return newCartItems;
    },
  },
};
