import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


function NavBar({ cantidad }) {
  const {user, logout} = useAuth();
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Kembang</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/products">Productos</Nav.Link>
            <Nav.Link as={Link} to="/sales">Ofertas</Nav.Link>
            <Nav.Link as={Link} to="/cart">Carrito ({cantidad})</Nav.Link>
            {user ? (
                <Nav.Link onClick={logout}>Salir ({user.name})</Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login">Ingresar</Nav.Link>
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;