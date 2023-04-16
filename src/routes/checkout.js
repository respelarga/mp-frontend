import { useRouteLoaderData } from "react-router-dom";
import { getDiscounts } from "../graphQuery";
import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { getProductById } from "../graphQuery";
import { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";

export async function loader({ params }) {
  const discounts = await getDiscounts({ params });
  return discounts;
}

const REMOVE_FROM_CART = gql`
  mutation AddToCart($products: String!) {
    addToCart(products: $products) {
      products
    }
  }
`;

function Checkout() {
  const cart = useRouteLoaderData("root");
  const discounts = useLoaderData();
  const [removeFromCart, { data, loading, error }] =
    useMutation(REMOVE_FROM_CART);
  const [cartData, setCartData] = useState([]);
  const [cartState, setCartState] = useState("");
  let subTotal = 0;

  useEffect(() => {
    setCartState("loading");
    setCartData([]);
    if (Object.keys(cart).length > 0) {
      Object.keys(cart).map(async (id, i, arr) => {
        let data = await getProductById(id);
        setCartData((cartData) => [...cartData, data]);
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
      ) : cartData.length === 0 ? (
        <span className="">Cart is Empty!</span>
      ) : (
        cartData.map((data, i, arr) => {
          subTotal += parseFloat(data.productById.price);
          return (
            <>
              <div className="row mb-3">
                <div className="col-md-3">
                  <Link to={`/product/${data.productById.handle}`}>
                    <img src={data.productById.img} className="img-fluid" />
                  </Link>
                </div>
                <div className="col-md-7">
                  <Link to={`/product/${data.productById.handle}`}>
                    <span className="d-block">{data.productById.name}</span>
                  </Link>
                  <span className="d-block">${data.productById.price}</span>
                </div>
                <div className="col-md-2">
                  <Button
                    variant="danger"
                    onClick={() => {
                      delete cart[data.productById.id];
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
                  <div className="row border-top">
                    <div class="col-md-12 mt-3 text-right">
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
                  </div>
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
