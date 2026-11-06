import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Whatsapp, Tiktok } from 'react-bootstrap-icons';

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <Container>
        <Row className="g-4">
          <Col xs={12} md={4}>
            <h5 className="fw-bold">Kembang</h5>
            <p className="small mb-3">Plantas, maceteros y cuidado vegetal.</p>
            <div className="d-flex gap-3 fs-5">
              <a href="#" className="text-light" aria-label="Instagram"><Instagram /></a>
              <a href="#" className="text-light" aria-label="Facebook"><Facebook /></a>
              <a href="#" className="text-light" aria-label="Facebook"><Tiktok/></a>
              <a href="#" className="text-light" aria-label="WhatsApp"><Whatsapp /></a>
            </div>
          </Col>

          <Col xs={6} md={2}>
            <h6 className="fw-bold">Tienda</h6>
            <ul className="list-unstyled small">
              <li><Link to="/" className="text-light text-decoration-none">Inicio</Link></li>
              <li><Link to="/products" className="text-light text-decoration-none">Productos</Link></li>
              <li><Link to="/sales" className="text-light text-decoration-none">Ofertas</Link></li>
              <li><Link to="/cart" className="text-light text-decoration-none">Carrito</Link></li>
            </ul>
          </Col>

          <Col xs={6} md={3}>
            <h6 className="fw-bold">Información</h6>
            <ul className="list-unstyled small">
              <li>Lun a Vie: 9:00 Am - 18:00 Pm</li>
              <li>Despacho a todo Chile</li>
              <li>Pago con Webpay y transferencia</li>
            </ul>
          </Col>

          <Col xs={12} md={3}>
            <h6 className="fw-bold">Contacto</h6>
            <ul className="list-unstyled small">
              <li>contacto@kembang.cl</li>
              <li>+56 9 1234 5678</li>
              <li>Santiago, Chile</li>
            </ul>
          </Col>
        </Row>
        

        <hr className="border-secondary my-4" />
        <p className="text-center small mb-0">
          © 2026 Kembang. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;