import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import Button from "react-bootstrap/Button";
import { Form } from "react-router-dom";

const ADD_TO_CART = gql`
  mutation AddToCart($products: String!) {
    addToCart(products: $products) {
      products
    }
  }
`;

function ProductBox(props) {
  const [addToCart, { data, loading, error }] = useMutation(ADD_TO_CART);
  return (
    <div className="col-md-3">
      <Link to={`/product/${props.productHandle}`}>
        <img src={props.productImg} className="img-fluid p-3" />
        <span className="d-block text-center fw-bold">{props.productName}</span>
        <span className="d-block text-center">${props.productPrice}</span>
      </Link>
      <div className="d-block text-center mt-3">
        <Form>
          <Button
            variant="primary"
            onClick={() => {
              props.cart[props.productId] = "1";
              addToCart({
                variables: { products: JSON.stringify(props.cart) },
              });
            }}
          >
            Add to Cart
          </Button>{" "}
        </Form>
      </div>
    </div>
  );
}

export default ProductBox;
