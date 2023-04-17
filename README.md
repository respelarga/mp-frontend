# MP 1000: mp-frontend

This is an React app written in Typescript with Apollo GraphQL Client, It's default host and port is at http://localhost:3001

\*\* This works with this api server: https://github.com/respelarga/mp-graph-api.git

## Installation

Clone the project by using git

```bash
  git clone https://github.com/respelarga/mp-frontend.git
  cd mp-graph-api
```

Ensure Docker is running then run the following command

On Mac:

```bash
  $ ./setup.sh
```

On Windows: Coming Soon!

## API Reference

#### Endpoint

```bash
  POST /graphql
```

#### Get all products

```bash
  query GetProducts {
    products {
      id
      name
      price
      handle
      img
      description
    }
  }
```

| Variables     | Type     |
| :------------ | :------- |
| `id`          | `ID`     |
| `name`        | `string` |
| `price`       | `Float`  |
| `handle`      | `string` |
| `description` | `string` |
| `img`         | `string` |

#### Get one product

```bash
  POST /graphql
```

```bash
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      name
      price
      handle
      img
      description
    }
  }
```

| Variables     | Type      |
| :------------ | :-------- |
| `id`          | `ID!`     |
| `name`        | `string!` |
| `price`       | `Float!`  |
| `handle`      | `string`  |
| `description` | `string`  |
| `img`         | `string`  |

#### Get product by ID

```bash
  POST /graphql
```

```bash
  query Product($id: ID!) {
    productById(id: $id) {
      id
      name
      price
      handle
      img
      description
    }
  }
```

| Variables     | Type      |
| :------------ | :-------- |
| `id`          | `ID!`     |
| `name`        | `string!` |
| `price`       | `Float!`  |
| `handle`      | `string`  |
| `description` | `string`  |
| `img`         | `string`  |

#### Get cart

```bash
  POST /graphql
```

```bash
  query {
    cart {
      products
    }
  }
```

| Variables | Type          |
| :-------- | :------------ |
| `product` | `JSON object` |

\*\* NOTE: Uses session.id to track users cart

#### Get Discounts

```bash
  query {
    discount {
      percentage
      minimum
    }
  }
```

| Variables    | Type  |
| :----------- | :---- |
| `percentage` | `Int` |
| `minimum`    | `Int` |

#### Is logged user in?

```bash
  query {
    isLoggedIn
  }
```

| Variables    | Type      |
| :----------- | :-------- |
| `isLoggedIn` | `Boolean` |

\*\* NOTE: Uses session.id to check if logged in

#### Add/Remove product to cart

```bash
  mutation AddToCart($products: String!) {
    addToCart(products: $products) {
      products
    }
  }
```

| Variables  | Type                          |
| :--------- | :---------------------------- |
| `products` | `JSON Object within an Array` |

\*\* NOTE: Uses session.id to check if logged in

#### Add all product

```bash
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
```

| Variables     | Type     |
| :------------ | :------- |
| `uuid`        | `Int`    |
| `id`          | `ID`     |
| `name`        | `string` |
| `price`       | `Float`  |
| `handle`      | `string` |
| `description` | `string` |
| `img`         | `string` |

## Tech Stack

**Frontend:** Node React-app, Apollo Client Graphql

**Login:** Uses server side login from API endpoint
