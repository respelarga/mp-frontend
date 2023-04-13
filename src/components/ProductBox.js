import { Link } from "react-router-dom";

function ProductBox(props) {
  return (
    <div className="col-md-3">
        <Link to={`/product/${props.productHandle}`}>
            <img src={props.productImg} className="img-fluid"/>
            <span className="d-block text-center fw-bold">{props.productName}</span>
            <span className="d-block text-center">${props.productPrice}</span>
        </Link>
    </div>
  );
}

export default ProductBox;
