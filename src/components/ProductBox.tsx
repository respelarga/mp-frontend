import { Link, useRouteLoaderData, useOutletContext } from "react-router-dom";

import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { useMutation } from "@apollo/client";
import { ADD_TO_CART } from "../graph/mutation";

function ProductBox(props: Product): JSX.Element {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART);
  const cart = useRouteLoaderData("root") as Cart;
  const setShowCart: Function = useOutletContext();

  return (
    <Col md={3}>
      <Link
        className="text-decoration-none text-dark"
        to={`/product/${props.handle}`}
      >
        <img src={props.img} className="img-fluid p-3" />
        <span className="d-block text-center fw-bold">{props.name}</span>
        <span className="d-block text-center">${props.price}</span>
      </Link>
      <div className="d-block text-center mt-3">
        <Button
          variant="primary"
          onClick={() => {
            cart[props.id] = 1;
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
        </Button>{" "}
      </div>
    </Col>
  );
}

export default ProductBox;
