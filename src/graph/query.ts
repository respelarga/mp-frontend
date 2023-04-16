import { DocumentNode, gql } from "@apollo/client";
import client from "./client";

const GET_PRODUCTS: DocumentNode = gql`
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

export const getProducts: Function = async (): Promise<Product[] | null> => {
  const { data } = await client.query({
    query: GET_PRODUCTS,
  });
  return data.products;
};

const GET_PRODUCT: DocumentNode = gql`
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      name
      price
      description
      img
    }
  }
`;

export const getProduct: Function = async (
  params: LoaderParams
): Promise<Product | null> => {
  const { data } = await client.query({
    query: GET_PRODUCT,
    variables: {
      handle: params.handle,
    },
  });
  return data.product;
};

const GET_CART: DocumentNode = gql`
  query {
    cart {
      products
    }
  }
`;

export const getCart: Function = async (): Promise<Cart> => {
  const { data } = await client.query({
    query: GET_CART,
  });
  if (data.cart !== null) {
    return JSON.parse(data.cart.products);
  } else {
    return {};
  }
};

const GET_PRODUCT_BY_ID: DocumentNode = gql`
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

export const getProductById: Function = async (
  id: String
): Promise<Product | null> => {
  const { data } = await client.query({
    query: GET_PRODUCT_BY_ID,
    variables: {
      id,
    },
  });

  return data.productById;
};

const GET_DISCOUNTS: DocumentNode = gql`
  query {
    discount {
      percentage
      minimum
    }
  }
`;

export const getDiscounts: Function = async (): Promise<Product[] | null> => {
  const { data } = await client.query({
    query: GET_DISCOUNTS,
  });
  return data.discount;
};

export const IS_LOGGED_IN: DocumentNode = gql`
  query {
    isLoggedIn
  }
`;
