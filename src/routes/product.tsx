import { useLoaderData } from "react-router-dom";

import { getProduct } from "../graph/query";

export async function loader({
  params,
}: {
  params: LoaderParams;
}): Promise<Product> {
  const product = await getProduct(params);
  return product;
}

function Product(): JSX.Element {
  const product = useLoaderData() as Product;
  return (
    <div className="d-flex flex-wrap">
      <div className="col-md-6">
        <img src={product.img} className="img-fluid" />
      </div>
      <div className="col-md-6">
        <span className="d-block fw-bold">{product.name}</span>
        <span className="d-block">${product.price}</span>
        <span className="d-block">{product.description}</span>
      </div>
    </div>
  );
}

export default Product;
