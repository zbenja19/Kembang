import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Image from '../atoms/Image';
import "../../styles/organisms/ProductCard.css";

const formatear = (n) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(n);

function ProductCard({ product, onAgregar }) {
  const descuento = product.descuento || 0;
  const precioFinal = descuento
    ? Math.round(product.price * (1 - descuento / 100))
    : product.price;

  return (
    <Card className="h-100 shadow-sm home__card">
      <div className="home__img-wrap">
        <Image src={product.image} alt={product.name} className="home__img" />
        {descuento > 0 && <span className="home__badge">-{descuento}%</span>}
      </div>

      <Card.Body className="d-flex flex-column">
        {product.categoria && (
          <small className="text-muted text-uppercase">{product.categoria}</small>
        )}
        <Card.Title className="h6 mt-1">{product.name}</Card.Title>

        <div className="mb-3">
          {descuento > 0 ? (
            <>
              <span className="text-muted text-decoration-line-through me-2">
                {formatear(product.price)}
              </span>
              <span className="fw-bold text-danger">{formatear(precioFinal)}</span>
            </>
          ) : (
            <span className="fw-bold">{formatear(product.price)}</span>
          )}
        </div>

        <div className="mt-auto d-grid gap-2">
          <Link
            to={`/products/${product.id}`}
            className="btn btn-outline-success btn-sm"
          >
            Ver detalle
          </Link>
          {onAgregar && (
            <button
              type="button"
              className="btn btn-success btn-sm"
              onClick={() => onAgregar(product)}
            >
              Agregar al carrito
            </button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;