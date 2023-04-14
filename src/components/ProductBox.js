import { Link } from "react-router-dom";
import { gql, useMutation} from '@apollo/client';
import Button from 'react-bootstrap/Button';

const ADD_TO_CART = gql`
    mutation AddToCart($products:String!){
        addToCart(products:$products){
            products
        }
    }
`


function ProductBox(props) {
  const [addToCart, { data, loading, error }] = useMutation(ADD_TO_CART);
  return (
    <div className="col-md-3">
        <Link to={`/product/${props.productHandle}`}>
            <img src={props.productImg} className="img-fluid p-3"/>
            <span className="d-block text-center fw-bold">{props.productName}</span>
            <span className="d-block text-center">${props.productPrice}</span>
        </Link>
        <div className="d-block text-center mt-3">
            <Button variant="primary" onClick={() => {
                    addToCart({ variables: { products: `[${props.productId}]:1` } })
            }}>Add to Cart</Button>{' '}
        </div>
        
    </div>
  );
}

export default ProductBox;
