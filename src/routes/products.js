import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery, gql } from '@apollo/client';
import ProductBox from '../components/ProductBox';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      handle
      img
    }
  }
`;


function Products() {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
      <div className="d-flex flex-wrap">
        {data.products.map((product)=> {
            return <ProductBox 
                key={product.id} 
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
