import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider, gql } from '@apollo/client';
import client from './graphClient'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Root, { loader as rootLoader } from "./routes/root";
import ErrorPage from './error-page';
import Products, { loader as productsLoader,
} from './routes/products'
import Product, { loader as productLoader,
} from './routes/product'

const GET_CART = gql`
    query{
        cart{
            products
        }
    }
`;

export const getCart = async () => {
    const { data } = await client.query({
        query:GET_CART,
        variables: {}
    })
    return data
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: getCart,
    id: 'root',
    children: [
      {
        path: "/products",
        element: <Products />,
        loader: productsLoader
      },
      {
        path: "/product/:handle",
        element: <Product />,
        loader: productLoader
      },
    ],
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
