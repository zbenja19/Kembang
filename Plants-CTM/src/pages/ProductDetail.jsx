import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import products from '../data/products';
import Image from '../components/atoms/Image';
import Button from '../components/atoms/Button';
import PriceTag from '../components/atoms/PriceTag';

function ProductDetail() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [cantidad,setCantidad] = useState(1);

    const encontrado = products.find((p) => String(p.id) === id);

    if (!encontrado) {
        return (
            <container className="mt-5">
                <h1>Producto no encontrado</h1>
                <Button variant="primary" onClick={()=> navigate('/products')}>Volver a productos</Button>
            </container>
        );
    }
    const product =
      encontrado.descuento >0 
      ?{
        ...encontrado,
        precioOriginal: encontrado.precio,
        precio: Math.round(encontrado.precio * (1 - encontrado.descuento / 100)) 
      }
      :encontrado;

      return(
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
            <PriceTag price={product.price} originalPrice={product.precioOriginal} />
            <small className="text-muted fs-6"> / Unidad</small>
          </div>

          <p className="mb-4">{product.description}</p>

          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center">
              <Button
                variant="outline-secondary"
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
              >
                -
              </Button>
              <span className="mx-3">{cantidad}</span>
              <Button
                variant="outline-secondary"
                onClick={() => setCantidad((c) => c + 1)}
              >
                +
              </Button>
            </div>
            <Button variant="primary" onClick={() => onAgregar(product, cantidad)}>
              Agregar al carro
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;