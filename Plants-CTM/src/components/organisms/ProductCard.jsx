import { Card } from 'react-bootstrap';
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import CardBody from '../molecules/CardBody';
import { useNavigate } from 'react-router-dom';
import "../../styles/organisms/ProductCard.css";

function ProductCard({ product, onAgregar }) {
  const navigate = useNavigate();

  return (
    <Card className="productcard">
      <Image
        src={product.image}
        alt={product.name}
        className="productcard__image"
      />
      <CardBody
        title={product.name}
        description={product.description}
        price={product.price}
        originalPrice={product.precioOriginal}
      >
        <Button
          variant="primary"
          onClick={() => navigate(`/products/${product.id}`)}
        >
          Ver detalles
        </Button>
        <Button variant="success" onClick={() => onAgregar(product)}>
          Agregar al carrito
        </Button>
      </CardBody>
    </Card>
  );
}

export default ProductCard;