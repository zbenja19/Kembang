import { Container, Table, Button } from 'react-bootstrap';

function Cart({ carrito, onCambiarCantidad, onQuitar }) {
  const total = carrito.reduce((acc, item) => acc + item.price * item.cantidad, 0);

  return (
    <Container className="my-5">
      <h1>Carrito</h1>
      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <Table responsive>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <Button size="sm" variant="outline-secondary" onClick={() => onCambiarCantidad(item.id, -1)}>-</Button>
                    <span className="mx-2">{item.cantidad}</span>
                    <Button size="sm" variant="outline-secondary" onClick={() => onCambiarCantidad(item.id, 1)}>+</Button>
                  </td>
                  <td>${(item.price * item.cantidad).toFixed(2)}</td>
                  <td>
                    <Button size="sm" variant="danger" onClick={() => onQuitar(item.id)}>Quitar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h4 className="text-end">Total: ${total.toFixed(2)}</h4>
        </>
      )}
    </Container>
  );
}

export default Cart;