import {Container, Row, Col} from "react-bootstrap";
import "../../styles/organisms/Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <Container className="py-4">
        <Row className="gy-4">
          <Col md={6}>
            <h5>Kembang</h5>
            <p className="mb-0">Plantas, maceteros y cuidado vegetal.</p>
          </Col>
          <Col md={{ span: 4, offset: 2 }}>
            <h5>Contactos</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="https://www.instagram.com/l_ci4n/?hl=es-la" target="_blank" rel="noreferrer">Instagram</a>
              </li>
              <li>
                <a href="https://www.youtube.com/shorts/IQcq9lFWO6s" target="_blank" rel="noreferrer">YouTube</a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@feledm1/video/7688770074638961921" target="_blank" rel="noreferrer">TikTok</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>

      <div className="footer-copyright">
        <Container className="py-3">
          © 2026 Kembang, Todos los derechos reservados
        </Container>
      </div>
    </footer>
  );
}

export default Footer;

