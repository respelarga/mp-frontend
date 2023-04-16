import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";

import { useQuery } from "@apollo/client";
import { getCart, IS_LOGGED_IN } from "../graph/query";

import CartModal from "../components/CartModal";

export async function loader(): Promise<Cart> {
  const cart = await getCart();
  return cart;
}

function Root(): JSX.Element {
  const { data, loading, error } = useQuery(IS_LOGGED_IN);
  const [showCart, setShowCart] = useState<boolean>(false);
  const handleClose = () => setShowCart(false);
  const handleShow = () => setShowCart(true);
  if (loading) return <span>Loading...</span>;
  if (error) return <span>Error! {error.message}</span>;

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Link className="text-decoration-none" to="/">
            <Navbar.Brand>MP-1000</Navbar.Brand>
          </Link>

          {data.isLoggedIn ? (
            <Link className="text-decoration-none" to="/upload">
              <Nav.Item>Upload Products</Nav.Item>
            </Link>
          ) : (
            <Link
              className="text-decoration-none"
              to={`http://localhost:3000/sign_in?return_url=${encodeURIComponent(
                "http://localhost:3001"
              )}`}
            >
              <Nav.Item>Sign In</Nav.Item>
            </Link>
          )}
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
