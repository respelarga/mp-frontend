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

export const ADD_PRODUCT: DocumentNode = gql`
  mutation AddProduct(
    $uuid: Int!
    $name: String!
    $price: Float!
    $handle: String!
    $img: String
    $description: String
  ) {
    addProduct(
      uuid: $uuid
      name: $name
      price: $price
      handle: $handle
      img: $img
      description: $description
    ) {
      name
      img
    }
  }
`;
