import { DocumentNode, gql } from "@apollo/client";

export const REMOVE_FROM_CART: DocumentNode = gql`
  mutation AddToCart($products: String!) {
    addToCart(products: $products) {
      products
    }
  }
`;

export const ADD_TO_CART: DocumentNode = gql`
  mutation AddToCart($products: String!) {
    addToCart(products: $products) {
      products
    }
  }
`;
