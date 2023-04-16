import {
  useLoaderData,
  useRouteLoaderData,
  useOutletContext,
} from "react-router-dom";

import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { useMutation } from "@apollo/client";
import { ADD_TO_CART } from "../graph/mutation";
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
  const [addToCart, { loading }] = useMutation(ADD_TO_CART);
  const cart = useRouteLoaderData("root") as Cart;
  const setShowCart: Function = useOutletContext();

  return (
    <div className="d-flex flex-wrap">
      <div className="col-md-6">
        <img src={product.img} className="img-fluid p-3" />
      </div>
      <div className="col-md-6">
        <span className="d-block mb-3 fw-bold">{product.name}</span>
        <span className="d-block mb-3">${product.price}</span>
        <span className="d-block mb-3">{product.description}</span>
        <Button
          variant="primary"
          onClick={() => {
            cart[product.id] = 1;
            addToCart({
              variables: { products: JSON.stringify(cart) },
            }).then(() => setShowCart(true));
          }}
        >
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <>Add to Cart</>
          )}
        </Button>
      </div>
    </div>
  );
}

export default Product;
