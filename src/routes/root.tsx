import { useState } from "react";
import { Outlet, useOutletContext, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import { getCart } from "../graph/query";

import CartModal from "../components/CartModal";

export async function loader(): Promise<Cart> {
  const cart = await getCart();
  return cart;
}

function Root(): JSX.Element {
  const [showCart, setShowCart] = useState<boolean>(false);
  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Link className="text-decoration-none" to="/">
            <Navbar.Brand>MP-1000</Navbar.Brand>
          </Link>
          <Button variant="success" onClick={handleShow}>
            Cart
          </Button>
        </Container>
      </Navbar>
      <Container className="my-5">
        <Outlet context={setShowCart} />
      </Container>
      <CartModal show={showCart} handleClose={handleClose} />
    </>
  );
}
export default Root;
