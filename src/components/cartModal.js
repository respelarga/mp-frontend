import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getProductById } from "../graphQuery";
import { useState, useEffect } from 'react';
import { gql, useMutation} from '@apollo/client';
import { useRouteLoaderData } from 'react-router-dom';


const REMOVE_FROM_CART = gql`
    mutation AddToCart($products:String!){
        addToCart(products:$products){
            products
        }
    }
`

function CartModal(props) {
  const [removeFromCart, { data, loading, error }] = useMutation(REMOVE_FROM_CART);
  const [cartData, setCartData] = useState([]);
  const [cartState, setCartState] = useState('');

  useEffect(() => {
    setCartState('loading');
    setCartData([])
    if(Object.keys(props.cart).length > 0) {
      Object.keys(props.cart).map(async (id, i, arr) => {
        let data = await getProductById(id)
        setCartData( cartData => [...cartData, data]);
        if(arr.length -1 === i){
          setCartState('success');
        }
      })
    } else {
      setCartState('success');
    }
   
  }, [JSON.stringify(props.cart)])

    return (
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartState === 'loading' ? (
              <h1>Loading...</h1>
          ) : (
              cartData.length === 0 ? 
                <span className="">Cart is Empty!</span>
              :               
              cartData.map((data,i)=>{
                return (
                  <>
                    <div className="row mb-3">
                      <div className="col-md-3">
                      <Link to={`/product/${data.productById.handle}`} onClick={props.handleClose}>
                        <img src={data.productById.img} className="img-fluid"/>
                      </Link>
                      </div>
                      <div className="col-md-7"> 
                        <Link to={`/product/${data.productById.handle}`} onClick={props.handleClose}>
                          <span className="d-block">{data.productById.name}</span>
                        </Link>
                        <span className="d-block">${data.productById.price}</span>
                      </div>
                      <div className="col-md-2"> 
                      <Button variant="danger" onClick={() => {
                          delete props.cart[data.productById.id]
                          removeFromCart({ variables: { products: JSON.stringify(props.cart) } })
                        }  
                      }>
                        x
                      </Button>
                      </div>
                    </div>                    
                  </>
                )
              })

          )}
    
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default CartModal;
