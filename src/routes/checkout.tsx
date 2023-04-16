import { useState, useEffect } from "react";
import { useRouteLoaderData, useLoaderData, Link } from "react-router-dom";

import Button from "react-bootstrap/Button";

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
        <span className="">Cart is Empty!</span>
      ) : (
        cartProducts.map((data: Product, i, arr) => {
          subTotal += data.price;
          return (
            <>
              <div className="row mb-3">
                <div className="col-md-3">
                  <Link to={`/product/${data.handle}`}>
                    <img src={data.img} className="img-fluid" />
                  </Link>
                </div>
                <div className="col-md-7">
                  <Link to={`/product/${data.handle}`}>
                    <span className="d-block">{data.name}</span>
                  </Link>
                  <span className="d-block">${data.price}</span>
                </div>
                <div className="col-md-2">
                  <Button
                    variant="danger"
                    onClick={() => {
                      delete cart[data.id];
                      removeFromCart({
                        variables: { products: JSON.stringify(cart) },
                      });
                    }}
                  >
                    x
                  </Button>
                </div>
              </div>
              {arr.length - 1 === i ? (
                <>
                  {/* <div className="row border-top">
                    <div className="col-md-12 mt-3 text-right">
                      {console.log(
                        discounts
                          .filter((discount) => {
                            return discount.minimum <= subTotal;
                          })
                          .reduce((prev, current) => {
                            return prev.minimum > current.minimum
                              ? prev
                              : current;
                          })
                      )}
                      Subtotal: {subTotal}
                    </div>
                  </div> */}
                </>
              ) : null}
            </>
          );
        })
      )}
    </>
  );
}

export default Checkout;
