import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Image from '../atoms/Image';
import Button from '../atoms/Button';

function CartModal({ product, carrito, onCambiarCantidad, onClose }) {
  const navigate = useNavigate();

  const item = product ? carrito.find((i) => i.id === product.id) : null;
  const cantidad = item ? item.cantidad : 1;

  const irAlCarrito = () => {
    onClose();
    navigate('/cart');
  };

  const bajarCantidad = () => {
    if (cantidad > 1) onCambiarCantidad(product.id, -1);
  };

  return (
    <Modal show={product !== null} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Producto agregado a tu carrito</Modal.Title>
      </Modal.Header>
      {product && (
        <Modal.Body className="d-flex align-items-center gap-3">
          <Image
            src={product.image}
            alt={product.name}
            className="added-modal__image"
          />
          <div className="flex-grow-1">
            <h6 className="mb-1">{product.name}</h6>
            <span className="fw-bold">${product.price}</span>
          </div>
          <div className="d-flex align-items-center">
            <Button variant="outline-secondary" onClick={bajarCantidad}>
              -
            </Button>
            <span className="mx-3">{cantidad}</span>
            <Button
              variant="outline-secondary"
              onClick={() => onCambiarCantidad(product.id, 1)}
            >
              +
            </Button>
          </div>
        </Modal.Body>
      )}
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          Seguir comprando
        </Button>
        <Button variant="primary" onClick={irAlCarrito}>
          Ir al carrito
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;