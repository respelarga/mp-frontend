import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import client from './graphClient'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Root from "./routes/root";
import ErrorPage from './error-page';
import Products, { loader as productsLoader,
} from './routes/products'
import Product, { loader as productLoader,
} from './routes/product'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
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
