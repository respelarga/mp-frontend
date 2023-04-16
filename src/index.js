import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider, gql } from "@apollo/client";
import client from "./graphClient";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root, { loader as rootLoader } from "./routes/root";
import ErrorPage from "./error-page";
import Products, { loader as productsLoader } from "./routes/products";
import Product, { loader as productLoader } from "./routes/product";
import Checkout, { loader as checkoutLoader } from "./routes/checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    id: "root",
    children: [
      {
        path: "/products",
        element: <Products />,
        loader: productsLoader,
      },
      {
        path: "/product/:handle",
        element: <Product />,
        loader: productLoader,
      },
      {
        path: "/checkout",
        element: <Checkout />,
        loader: checkoutLoader,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
