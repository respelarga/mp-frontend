import { gql } from "@apollo/client";
import client from "./graphClient";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      handle
      img
    }
  }
`;

export const getProducts = async ({ params, request }) => {
  const { data } = await client.query({
    query: GET_PRODUCTS,
    variables: {},
  });
  return data.products;
};

const GET_PRODUCT = gql`
  query Product($handle: String!) {
    product(handle: $handle) {
      name
      price
      description
      img
    }
  }
`;
export const getProduct = async ({ params, request }) => {
  const { data } = await client.query({
    query: GET_PRODUCT,
    variables: {
      handle: params.handle,
    },
  });
  return data.product;
};

const GET_CART = gql`
  query {
    cart {
      products
    }
  }
`;

export const getCart = async () => {
  const { data } = await client.query({
    query: GET_CART,
    variables: {},
  });

  if (data.cart != null) {
    return JSON.parse(data.cart.products);
  } else {
    return data;
  }
};

const GET_PRODUCT_BY_ID = gql`
  query Product($id: ID!) {
    productById(id: $id) {
      id
      name
      price
      img
      handle
    }
  }
`;

export const getProductById = async (id) => {
  const { data } = await client.query({
    query: GET_PRODUCT_BY_ID,
    variables: {
      id,
    },
  });

  if (data.cart != null) {
    return JSON.parse(data.cart.products);
  } else {
    return data;
  }
};
