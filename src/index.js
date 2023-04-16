import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import client from "./graph/client";

import Root, { loader as rootLoader } from "./routes/root";
import Products, { loader as productsLoader } from "./routes/products";
import Product, { loader as productLoader } from "./routes/product";
import Checkout, { loader as checkoutLoader } from "./routes/checkout";
import ErrorPage from "./error-page";

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
