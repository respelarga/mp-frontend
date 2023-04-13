import { gql } from '@apollo/client';
import client from './graphClient';

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

export const getProducts = async ({params, request}) => {
    const { data } = await client.query({
        query:GET_PRODUCTS,
        variables: {}
    })
    return data.products
}

const GET_PRODUCT = gql`
    query Product($id:ID!){
        product(id:$id){
            name
            price
            description
            img
        }
    }
`;
export const getProduct = async ({params, request}) => {
    const { data } = await client.query({
        query:GET_PRODUCTS,
        variables: {}
    })
    return data.products
}
