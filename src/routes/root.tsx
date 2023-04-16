import { useState } from "react";
import { Outlet, useRouteLoaderData } from "react-router-dom";

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
          <Navbar.Brand href="#home">MP-1000</Navbar.Brand>
          <Button variant="primary" onClick={handleShow}>
            Cart
          </Button>
        </Container>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
      <CartModal show={show} handleClose={handleClose} cart={cart as Cart} />
    </>
  );
}
export default Root;
