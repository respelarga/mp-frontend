import { useState, useEffect } from "react";
import { useRouteLoaderData, useLoaderData, Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useMutation } from "@apollo/client";
import { getProductById, getDiscounts } from "../graph/query";
import { REMOVE_FROM_CART } from "../graph/mutation";

export async function loader(): Promise<Discount[]> {
  const discounts = await getDiscounts();
  return discounts;
}

function Checkout(): JSX.Element {
  const cart = useRouteLoaderData("root") as Cart;
  const discounts = useLoaderData() as Discount[];
  const [removeFromCart, { data, loading, error }] =
    useMutation(REMOVE_FROM_CART);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const [cartState, setCartState] = useState<CartState>("loading");
  let subTotal = 0;

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
    <>
      {cartState === "loading" ? (
        <h1>Loading...</h1>
      ) : cartProducts.length === 0 ? (
        <span className="">
          Cart is Empty! <Link to="/">Continue Shopping</Link>
        </span>
      ) : (
        cartProducts.map((product: Product, i, arr): JSX.Element => {
          subTotal += product.price;
          return (
            <>
              <Row className="mb-3">
                <Col md={3}>
                  <Link to={`/product/${product.handle}`}>
                    <img src={product.img} className="img-fluid" />
                  </Link>
                </Col>
                <Col md={7}>
                  <Link
                    className="text-decoration-none text-black fw-bold"
                    to={`/product/${product.handle}`}
                  >
                    <span className="d-block">{product.name}</span>
                  </Link>
                  <span className="d-block">${product.price}</span>
                </Col>
                <Col md={2}>
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
                </Col>
              </Row>
            </>
          );
        })
      )}
      {cartProducts.length > 0 ? (
        <>
          <Row>
            <Col className="pt-3 mb-3 text-right border-top" md={12}>
              <span className="d-block">Subtotal: ${subTotal}</span>
            </Col>
            <Col className="pt-3 mb-3 text-right border-top" md={12}>
              {calculateDiscount(discounts, subTotal)}
            </Col>
          </Row>
        </>
      ) : null}
    </>
  );
}

export default Checkout;

function calculateDiscount(
  discounts: Discount[],
  subTotal: number
): JSX.Element {
  let discountApplied: Discount;
  const discountElgible = discounts.filter((discount: Discount) => {
    return discount.minimum <= subTotal;
  });
  if (discountElgible.length > 0) {
    discountApplied = discountElgible.reduce((prev, current) => {
      return prev.minimum > current.minimum ? prev : current;
    });
    const total: number =
      subTotal - (discountApplied.percentage / 100) * subTotal;
    return (
      <>
        <span className="d-block mb-3 fw-bold">
          Discount appilied {discountApplied.percentage}% off on total greater
          than ${discountApplied.minimum}
        </span>
        <span className="d-block fw-bold">Total: ${total.toFixed(2)}</span>
      </>
    );
  } else {
    return <span className="d-block fw-bold">Total: ${subTotal}</span>;
  }
}
