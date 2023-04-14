import 'bootstrap/dist/css/bootstrap.min.css';
import { getProduct } from '../graphQuery';
import { useLoaderData } from 'react-router-dom';
import ProductBox from '../components/productBox';

export async function loader({ params }) {
    const product = await getProduct({params});
    return { product };
}

function Product() {
  const { product } = useLoaderData();
  console.log(product)
  return (
    <div className="d-flex flex-wrap">
        <div className="col-md-6">
            <img src={product.img} className="img-fluid"/>
        </div>
        <div className="col-md-6">
            <span className="d-block fw-bold">{product.name}</span>
            <span className="d-block">${product.price}</span>
            <span className="d-block">{product.description}</span>
        </div>
    </div>
  );
}

export default Product;
