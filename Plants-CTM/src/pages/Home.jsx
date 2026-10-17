import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Hero from '../components/organisms/Hero.jsx';
import Image from '../components/atoms/Image';
import { useProducts } from '../context/ProductsContext';

const formatear = (n) => `$${Number(n).toLocaleString('es-CL')}`;

function Home() {
  const { products } = useProducts();

  // Productos con descuento y stock (máximo 4)
  const destacados = products
    .filter((p) => p.descuento > 0 && Number(p.stock) > 0)
    .slice(0, 4);

  return (
    <>
      <Hero />

      {/* Ofertas destacadas */}
      {destacados.length > 0 && (
        <Container className="my-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Ofertas destacadas</h2>
            <Link to="/sales" className="btn btn-success">
              Ver todas
            </Link>
          </div>
          <Row className="g-4">
            {destacados.map((p) => {
              const precioFinal = Math.round(p.price * (1 - p.descuento / 100));
              return (
                <Col sm={6} lg={3} key={p.id}>
                  <Card className="h-100 shadow-sm">
                    <div className="home__img-wrap">
                      <Image src={p.image} alt={p.name} className="home__img" />
                      <span className="home__badge">-{p.descuento}%</span>
                    </div>
                    <Card.Body className="d-flex flex-column">
                      <small className="text-muted text-uppercase">{p.categoria}</small>
                      <Card.Title className="h6 mt-1">{p.name}</Card.Title>
                      <div className="mb-3">
                        <span className="text-muted text-decoration-line-through me-2">
                          {formatear(p.price)}
                        </span>
                        <span className="fw-bold text-danger">{formatear(precioFinal)}</span>
                      </div>
                      <Link
                        to={`/products/${p.id}`}
                        className="btn btn-outline-success btn-sm mt-auto"
                      >
                        Ver detalle
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      )}

      {/* Quiénes somos */}
      <Container className="my-5">
        <Row className="align-items-center g-4">
          <Col md={6}>
            <h2>¿Quiénes somos?</h2>
            <p>
              Kembang es una tienda de plantas de exterior e interior. Traemos
              todo el equipamiento para tus plantas: maceteros y productos de
              cuidado vegetal.
            </p>
            <p>
              Queremos que tu hogar se vea más verde, con plantas que dan vida.
            </p>
            <Link to="/products" className="btn btn-success">
              Ver productos
            </Link>
          </Col>
          <Col md={6}>
            <img
              className="home__about-img"
              src="https://i.pinimg.com/736x/4b/9a/0c/4b9a0c0e54e8c9d8e730f43ab6248739.jpg"
              alt="Plantas Kembang"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;