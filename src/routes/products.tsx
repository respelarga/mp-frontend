import { useLoaderData } from "react-router-dom";

import Row from "react-bootstrap/Row";

import { getProducts } from "../graph/query";

import ProductBox from "../components/ProductBox";

export async function loader(): Promise<Product[]> {
  const products = await getProducts();
  return products;
}

function Products(): JSX.Element {
  const products = useLoaderData() as Product[];
  return (
    <Row>
      {products.map((product: Product): JSX.Element => {
        return (
          <ProductBox
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            img={product.img}
            handle={product.handle}
          />
        );
      })}
    </Row>
  );
}

export default Products;
