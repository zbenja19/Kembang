import { Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

function ProductGrid({ products, lg = 4, onAgregar }) {
  return (
    <Row className="g-4">
      {products.map((product) => (
        <Col key={product.id} xs={12} md={6} lg={lg}>
          <ProductCard product={product} onAgregar={onAgregar} />
        </Col>
      ))}
    </Row>
  );
}

export default ProductGrid;