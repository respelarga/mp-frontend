import { Outlet, useRouteLoaderData } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { getCart } from "../graphQuery";
import CartModal from "../components/cartModal";

export async function loader({ params }) {
  const cart = await getCart();
  return cart;
}

function Root() {
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
      <CartModal show={show} handleClose={handleClose} cart={cart} />
    </>
  );
}
export default Root;
