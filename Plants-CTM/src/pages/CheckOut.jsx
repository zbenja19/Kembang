import { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Checkout({ carrito, onVaciar }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [direccion, setDireccion] = useState('');
  const [comuna, setComuna] = useState('');
  const [tarjeta, setTarjeta] = useState('');
  const [vencimiento, setVencimiento] = useState('');
  const [cvv, setCvv] = useState('');
  const [error, setError] = useState('');
  const [compraLista, setCompraLista] = useState(false);
  const [totalPagado, setTotalPagado] = useState(0);
  const [fecha, setFecha] = useState('');

  const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);

  const pagar = (e) => {
    e.preventDefault();

    if (
      nombre === '' || correo === '' || direccion === '' || comuna === '' ||
      tarjeta === '' || vencimiento === '' || cvv === ''
    ) {
      setError('Completa todos los campos');
      return;
    }

    if (tarjeta.length !== 16) {
      setError('La tarjeta debe tener 16 números');
      return;
    }

    if (cvv.length !== 3) {
      setError('El CVV debe tener 3 números');
      return;
    }

    setError('');
    setTotalPagado(total);
    setFecha(new Date().toLocaleString('es-CL'));
    setCompraLista(true);
    onVaciar();
  };

  if (compraLista) {
    return (
      <Container className="my-5">
        <Alert variant="success">
          <h4>¡Gracias por tu compra, {nombre}!</h4>
          <p>Total pagado: ${totalPagado}</p>
          <p>Fecha de compra: {fecha}</p>
          <p>Te enviaremos el pedido a: {direccion}, {comuna}</p>
        </Alert>
        <Button as={Link} to="/products" variant="success">
          Volver a la tienda
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1>Pagar</h1>
      <h4>Total: ${total}</h4>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={pagar}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Dirección</Form.Label>
          <Form.Control value={direccion} onChange={(e) => setDireccion(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Comuna</Form.Label>
          <Form.Control value={comuna} onChange={(e) => setComuna(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Número de tarjeta</Form.Label>
          <Form.Control value={tarjeta} onChange={(e) => setTarjeta(e.target.value)} />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de vencimiento</Form.Label>
              <Form.Control
                placeholder="MM/AA"
                maxLength={5}
                value={vencimiento}
                onChange={(e) => setVencimiento(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="password"
                maxLength={3}
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="success">
          Pagar
        </Button>
      </Form>
    </Container>
  );
}

export default Checkout;