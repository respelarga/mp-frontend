import { useState, useEffect } from "react";
import { useRouteLoaderData, Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useMutation } from "@apollo/client";
import { getProductById } from "../graph/query";
import { REMOVE_FROM_CART } from "../graph/mutation";

function CartModal(props: CartModalProps): JSX.Element {
  const cart = useRouteLoaderData("root") as Cart;

  const [removeFromCart, { data, loading, error }] =
    useMutation(REMOVE_FROM_CART);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [cartState, setCartState] = useState<CartState>("loading");

  useEffect(() => {
    setCartState("loading");
    setCartProducts([]);
    if (Object.keys(cart).length > 0) {
      Object.keys(cart).map(async (id, i, arr) => {
        let data = await getProductById(id);
        setCartProducts((cartProducts) => [...cartProducts, data]);
        if (arr.length - 1 === i) {
          setCartState("success");
        }
      });
    } else {
      setCartState("success");
    }
  }, [JSON.stringify(cart)]);

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <>
          {cartState === "loading" ? (
            <h1>Loading...</h1>
          ) : cartProducts.length === 0 ? (
            <span className="">Cart is Empty!</span>
          ) : (
            cartProducts.map((product: Product): JSX.Element => {
              return (
                <>
                  <div className="row mb-3">
                    <div className="col-md-3">
                      <Link
                        to={`/product/${product.handle}`}
                        onClick={props.handleClose}
                      >
                        <img src={product.img} className="img-fluid" />
                      </Link>
                    </div>
                    <div className="col-md-7">
                      <Link
                        className="text-decoration-none text-dark"
                        to={`/product/${product.handle}`}
                        onClick={props.handleClose}
                      >
                        <span className="d-block fw-bold">{product.name}</span>
                      </Link>
                      <span className="d-block">${product.price}</span>
                    </div>
                    <div className="col-md-2">
                      <Button
                        variant="danger"
                        onClick={() => {
                          delete cart[product.id];
                          removeFromCart({
                            variables: { products: JSON.stringify(cart) },
                          });
                        }}
                      >
                        x
                      </Button>
                    </div>
                  </div>
                </>
              );
            })
          )}
        </>
      </Modal.Body>
      <Modal.Footer>
        <Link to={"/checkout"}>
          <Button variant="primary" onClick={props.handleClose}>
            Checkout
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;
