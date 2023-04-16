import { Link, useRouteLoaderData } from "react-router-dom";

import Button from "react-bootstrap/Button";

import { useMutation } from "@apollo/client";
import { ADD_TO_CART } from "../graph/mutation";

function ProductBox(props: Product): JSX.Element {
  const [addToCart, { data, loading, error }] = useMutation(ADD_TO_CART);
  const cart = useRouteLoaderData("root") as Cart;

  return (
    <div className="col-md-3">
      <Link to={`/product/${props.handle}`}>
        <img src={props.img} className="img-fluid p-3" />
        <span className="d-block text-center fw-bold">{props.name}</span>
        <span className="d-block text-center">${props.price}</span>
      </Link>
      <div className="d-block text-center mt-3">
        <Button
          variant="primary"
          onClick={() => {
            cart[props.id] = "1";
            addToCart({
              variables: { products: JSON.stringify(cart) },
            });
          }}
        >
          Add to Cart
        </Button>{" "}
      </div>
    </div>
  );
}

export default ProductBox;
