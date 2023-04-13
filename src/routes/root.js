import { 
    Outlet, 
    Link, 
    useLoaderData 
} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


function Root() {
    return (
      <>
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">MP-1000</Navbar.Brand>
        </Container>
        </Navbar>
        <Container>
            <Outlet />
        </Container>
      </>
    );
  }
  export default Root;