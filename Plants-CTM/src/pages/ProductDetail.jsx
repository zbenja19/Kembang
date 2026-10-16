import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import { useProducts } from '../context/ProductsContext';
import Image from '../components/atoms/Image';
import Button from '../components/atoms/Button';
import PriceTag from '../components/atoms/PriceTag';


function ProductDetail({ onAgregar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const [cantidad, setCantidad] = useState(1);

  const encontrado = products.find((p) => String(p.id) === id);

  if (!encontrado) {
    return (
      <Container className="mt-5">
        <h1>Producto no encontrado</h1>
        <Button variant="primary" onClick={() => navigate('/products')}>
          Volver a productos
        </Button>
      </Container>
    );
  }

  const product =
    encontrado.descuento > 0
      ? {
          ...encontrado,
          precioOriginal: encontrado.price,
          price: Math.round(encontrado.price * (1 - encontrado.descuento / 100)),
        }
      : encontrado;

  const stock = Number(product.stock ?? 0);
  const sinStock = stock <= 0;

  return (
    <Container className="my-5">
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
          Inicio
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/products' }}>
          Productos
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-4">
        <Col md={6}>
          <Image src={product.image} alt={product.name} className="detail__image" />
        </Col>

        <Col md={6}>
          <small className="text-muted text-uppercase">{product.categoria}</small>
          <h1 className="h2 mb-3">{product.name}</h1>

          <div className="fs-3 mb-3">
            <PriceTag price={product.price} OriginalPrice={product.precioOriginal} />
            <small className="text-muted fs-6"> / Unidad</small>
          </div>

          <div className="mb-3">
            <span className="text-muted">Stock disponible: </span>
            <span className="fw-bold">{sinStock ? 'Sin stock' : stock}</span>
          </div>

          <p className="mb-4">{product.description}</p>

          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center">
              <Button
                variant="outline-secondary"
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                disabled={sinStock || cantidad <= 1}
              >
                -
              </Button>
              <span className="mx-3">{cantidad}</span>
              <Button
                variant="outline-secondary"
                onClick={() => setCantidad((c) => Math.min(stock, c + 1))}
                disabled={sinStock || cantidad >= stock}
              >
                +
              </Button>
            </div>
            <Button
              variant="primary"
              onClick={() => onAgregar(product, cantidad)}
              disabled={sinStock}
            >
              Agregar al carro
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;