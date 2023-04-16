import { useLoaderData } from "react-router-dom";

import { getProducts } from "../graph/query";

import ProductBox from "../components/ProductBox";

export async function loader(): Promise<Product[]> {
  const products = await getProducts();
  return products;
}

function Products(): JSX.Element {
  const products = useLoaderData() as Product[];
  return (
    <div className="row">
      {products.map((product: Product) => {
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
    </div>
  );
}

export default Products;
