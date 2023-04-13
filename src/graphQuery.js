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
    console.log(params.handle);
    const { data } = await client.query({
        query:GET_PRODUCTS,
        variables: {}
    })
    console.log(data)
    return data.products
}

