import 'bootstrap/dist/css/bootstrap.min.css';
import { getProducts } from '../graphQuery';
import { useLoaderData,useRouteLoaderData } from 'react-router-dom';
import ProductBox from '../components/productBox';

export async function loader({ params }) {
    const products = await getProducts({params});
    return { products };
}

function Products() {
  const { products } = useLoaderData();
  const cart = useRouteLoaderData('root');
  return (
      <div className="row">
        {products.map((product)=> {
            return <ProductBox 
                key={product.id}
                productId={product.id}
                productName={product.name} 
                productPrice={product.price} 
                productImg={product.img}
                productHandle={product.handle}
                cart={cart}
                
                />
          })
        } 
      </div>
  );
}

export default Products;
