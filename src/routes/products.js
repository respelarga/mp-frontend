import 'bootstrap/dist/css/bootstrap.min.css';
import { getProducts } from '../graphQuery';
import { useLoaderData } from 'react-router-dom';
import ProductBox from '../components/productBox';

export async function loader({ params }) {
    const products = await getProducts({params});
    return { products };
}

function Products() {
  const { products } = useLoaderData();

  return (
      <div className="d-flex flex-wrap">
        {products.map((product)=> {
            return <ProductBox 
                key={product.id}
                productId={product.id}
                productName={product.name} 
                productPrice={product.price} 
                productImg={product.img}
                productHandle={product.handle}
                
                />
          })
        } 
      </div>
  );
}

export default Products;
