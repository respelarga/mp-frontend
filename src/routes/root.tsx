import { useState } from "react";
import { Outlet, useRouteLoaderData, Link } from "react-router-dom";

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
  const cart = useRouteLoaderData("root");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Link to="/">
            <Navbar.Brand>MP-1000</Navbar.Brand>
          </Link>
          <Button variant="primary" onClick={handleShow}>
            Cart
          </Button>
        </Container>
      </Navbar>
      <Container className="my-5">
        <Outlet />
      </Container>
      <CartModal show={show} handleClose={handleClose} />
    </>
  );
}
export default Root;
